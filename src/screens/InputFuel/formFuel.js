import { useState, useEffect } from 'react'
import { Pressable, View, Text, ScrollView, TextInput, Image, SafeAreaView, Alert } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';

import { getFuelTypeList, getLocationList, getVehiclesList, insertFuelChange, uploadTmpFileFuel } from '../../api/Fuel/fuel';
import { loginInfo } from '../../api/User/user';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

import blankImg from '../../assets/images/blankImg.png'

const formatDate = (date, specChar = '-') => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join(specChar);
}

const formatTime = (date) => {
    var d = new Date(date),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes()

    if (hour.length < 2) 
        hour = '0' + hour;
    if (minute.length < 2) 
        minute = '0' + minute;

    return [hour, minute].join(':');
}

const getPreviousMonth = () => {
    let currentDate = new Date();

    let previousMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    let previousMonthMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    return new Date(previousMonthYear, previousMonthMonth, 1);
}

const FormFuel = ({ navigation }) => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();
    
    const [imagePicker, setImagePicker] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [datePicker, setDatePicker] = useState(null)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [timePicker, setTimePicker] = useState(null)

    const [vehicles, setVehicles] = useState(null)
    const [fuels, setFuels] = useState(null)
    const [stores, setStores] = useState(null)

    const [openPlate, setOpenPlate] = useState(false);
    const [valuePlate, setValuePlate] = useState('');
    const [itemsPlate, setItemsPlate] = useState([]);

    const [openMode, setOpenMode] = useState(false);
    const [valueMode, setValueMode] = useState('');
    const [itemsMode, setItemsMode] = useState([
        {label: 'Nạp', value: 'Nạp'},
        {label: 'Xả', value: 'Xả'},
    ]);

    const [openStore, setOpenStore] = useState(false);
    const [valueStore, setValueStore] = useState('');
    const [itemsStore, setItemsStore] = useState([]);

    const [openFuel, setOpenFuel] = useState(false);
    const [valueFuel, setValueFuel] = useState('');
    const [itemsFuel, setItemsFuel] = useState([]);

    const [formFuel, setFormFuel] = useState({})

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted')
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')

            const itemsPlateList = await getVehiclesList(token)
            const fuelTypeList = await getFuelTypeList(token)
            const locationList = await getLocationList(token)

            setVehicles(itemsPlateList)
            setFuels(fuelTypeList)
            setStores(locationList)
            setItemsPlate(itemsPlateList.map(item => ({value: item.vehicle_id, label: item.plate})))
            setItemsFuel(fuelTypeList.map(item => ({value: item.fuel_type_id, label: item.fuel_type_name})))
            setItemsStore(locationList.map(item => ({value: item.location_id, label: item.location_name})))

            const userInfo = await loginInfo(token);
            setFormFuel({
                ...formFuel,
                'driver_code': userInfo.user_name,
                'driver_name': userInfo.name
            })
        })();
    }, []);

    useEffect(() => {
        if (datePicker && timePicker) 
            setFormFuel({
                ...formFuel,
                'trk_time': `${datePicker.replace(/-/g,'/')} ${timePicker}:00`
            })
    },[datePicker, timePicker])

    // useEffect(() => {
    //     (async () => {
    //         if (imagePicker.length) {
    //             const token = await AsyncStorage.getItem('token')
                
    //             let imageUri = imagePicker[imagePicker.length-1].assets[0].uri
                
    //             const formData = new FormData();
    //             formData.append('file', {
    //                 uri : imageUri,
    //                 type: mime.getType(imageUri),
    //                 name: imageUri.split("/").pop()
    //             });
                
    //             const res = await uploadTmpFileFuel(token, formData)
    //             console.log(img);
    //             setImageUpload(prev => prev.push(img))
    //         }
    //     })()
    // }, [imagePicker])

    const handleChange = (event, name) => {
        setFormFuel({
            ...formFuel,
            [name]: event.nativeEvent.text
        })
    }

    const handleForm = (name, value) => {
        setFormFuel({
            ...formFuel,
            [name]: value
        })
    }

    const handleAdd = async () => {
        const token = await AsyncStorage.getItem('token')
        const res = await insertFuelChange(token, formFuel)

        if (res.status) {
            Alert.alert('Thành công', 'Bạn thêm lần nạp/xả thành công')
            navigation.navigate('HistoryFuel');
        }
        else {
            Alert.alert('Thất bại', 'Bạn cần điền đầy đủ tất cả các trường')
        }
    }

    const handleVehicle = (item) => {
        const vehicle = vehicles.filter((veh) => veh.vehicle_id === item)[0]
        if (vehicle) {
            setFormFuel({
                ...formFuel,
                'vehicle_id': vehicle.vehicle_id,
                'vehicle_name': vehicle.name,
                'imei': vehicle.imei,
                'plate': vehicle.plate
            })
        }
    }

    const handleFuel = (item) => {
        const fuel = fuels.filter((fue) => fue.fuel_type_id === item)[0]
        if (fuel) {
            setFormFuel({
                ...formFuel,
                'fuel_type_id': fuel.fuel_type_id,
                'fuel_type_name': fuel.fuel_type_name
            })
        }
    }

    const handleStore = (item) => {
        const store = stores.filter((sto) => sto.location_id === item)[0]
        if (store) {
            setFormFuel({
                ...formFuel,
                'location_id': store.location_id,
                'location_name': store.location_name
            })
        }
    }

    const pickImage = async () => { 
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3,4],
            quality: 1,
        })
  
        if (!result.canceled)
            setImagePicker(imagePicker.concat([result]));
    }

    const photographImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3,4],
            quality: 1,
        })
      
        if (!result.canceled)
            setImagePicker(imagePicker.concat([result]));
    }

    const pickOptions = () => {
        const options = ['Chọn ảnh từ thư viện', 'Chụp ảnh', 'Hủy'];

        showActionSheetWithOptions({
            options
        }, (selectedIndex) => {
            if (selectedIndex == 0) 
                pickImage()
            else if (selectedIndex == 1)
                photographImage()
        });
    }

    if (hasGalleryPermission === false || hasCameraPermission === false) 
        return <Text>Bạn phải mở quyền truy cập máy ảnh cho ứng dụng</Text>

    DropDownPicker.setListMode('SCROLLVIEW')
    
    return ( 
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
                <Header navigation={navigation} title='NẠP/XẢ NHIÊN LIỆU'/>

                <View className='h-[75%]'>
                    <ScrollView nestedScrollEnabled={true} style={{flex: 1}} contentContainerStyle={{flexGrow:1}}>
                        <View className='flex flex-row mx-8 justify-between space-x-4' style={{ zIndex: 100 }}>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Chế độ <Text className='text-[#FF0000]'>*</Text></Text>
                                <DropDownPicker
                                    open={openMode}
                                    value={valueMode}
                                    items={itemsMode}
                                    setOpen={setOpenMode}
                                    setValue={setValueMode}
                                    setItems={setItemsMode}
                                    placeholder='Chế độ nạp/xả'
                                    placeholderStyle={{color:'#B0B0B0'}}
                                    dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                    className='border-white'
                                    style={style.shadow}
                                    onChangeValue={item => handleForm('type', item === 'Nạp' ? 0 : 1)}
                                />
                            </View>

                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Biển số <Text className='text-[#FF0000]'>*</Text></Text>
                                <DropDownPicker
                                    searchable={true}
                                    searchPlaceholder="Tìm kiếm"
                                    open={openPlate}
                                    value={valuePlate}
                                    items={itemsPlate}
                                    setOpen={setOpenPlate}
                                    setValue={setValuePlate}
                                    setItems={setItemsPlate}
                                    placeholder='Biển số xe'
                                    placeholderStyle={{color:'#B0B0B0'}}
                                    dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                    className='border-white'
                                    style={style.shadow}
                                    onChangeValue={item => handleVehicle(item)}
                                />
                            </View>
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Thời gian <Text className='text-[#FF0000]'>*</Text></Text>
                                <Pressable 
                                    onPress={() => setTimePickerVisibility(true)}
                                    className='bg-white rounded-lg flex flex-row justify-between items-center px-2 py-3.5' style={style.shadow}
                                >
                                    <Text className='text-text_color'>
                                        {timePicker ? timePicker: 'Thời gian'}
                                    </Text>
                                    <Icon name="clock" size={20}></Icon>
                                    <DateTimePickerModal
                                        isDarkModeEnabled={true}
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        onConfirm={(time) => {setTimePicker(formatTime(time)); setTimePickerVisibility(false)}}
                                        onCancel={() => setTimePickerVisibility(false)}
                                    />
                                </Pressable>
                            </View>

                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Ngày tháng năm <Text className='text-[#FF0000]'>*</Text></Text>
                                <Pressable 
                                    onPress={() => setDatePickerVisibility(true)}
                                    className='bg-white rounded-lg flex flex-row justify-between items-center px-2 py-3.5' style={style.shadow}
                                >
                                    <Text className='text-text_color'>
                                        {datePicker ? datePicker: 'Ngày tháng năm'}
                                    </Text>
                                    <Icon name="calendar" size={20}></Icon>
                                    <DateTimePickerModal
                                        minimumDate={getPreviousMonth()}
                                        maximumDate={new Date()}
                                        isDarkModeEnabled={true}
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={(date) => {setDatePicker(formatDate(date)); setDatePickerVisibility(false)}}
                                        onCancel={() => setDatePickerVisibility(false)}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View className='mt-2 mx-8' style={{ zIndex: 90 }}>
                            <Text className='px-2 py-2 font-medium'>CHXD <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                searchable={true}
                                searchPlaceholder="Tìm kiếm"
                                open={openStore}
                                value={valueStore}
                                items={itemsStore}
                                setOpen={setOpenStore}
                                setValue={setValueStore}
                                setItems={setItemsStore}
                                placeholder='Cửa hàng xăng dầu'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                className='border-white'
                                style={style.shadow}
                                onChangeValue={item => handleStore(item)}
                            />
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4' style={{ zIndex: 80 }}>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Loại dầu <Text className='text-[#FF0000]'>*</Text></Text>
                                <DropDownPicker
                                    searchable={true}
                                    searchPlaceholder="Tìm kiếm"
                                    open={openFuel}
                                    value={valueFuel}
                                    items={itemsFuel}
                                    setOpen={setOpenFuel}
                                    setValue={setValueFuel}
                                    setItems={setItemsFuel}
                                    placeholder='Nhập loại dầu'
                                    placeholderStyle={{color:'#B0B0B0'}}
                                    dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                    className='border-white'
                                    style={style.shadow}
                                    onChangeValue={item => handleFuel(item)}
                                />
                            </View>
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số km <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    onChange={(e) => handleChange(e, 'mileage_start')}
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập số km"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số lít dầu <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    onChange={(e) => handleChange(e, 'volume_change')}
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập số lít dầu"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Tổng tiền <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    onChange={(e) => handleChange(e, 'money')}
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập tổng tiền"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
                        </View>

                        <View className='flex flex-row mt-6 mx-8 justify-between space-x-4'>
                            <Text className='px-2 py-2 font-medium'>Thêm hình ảnh ({imagePicker.length})</Text>
                            <Pressable 
                                onPress={() => pickOptions()}
                                className='flex flex-row justify-around w-[50%] bg-btn_color py-3 rounded-2xl' 
                                style={style.shadow}
                            >
                                <Icon name="link" size={20} color='#CCC' solid></Icon>
                            </Pressable>
                        </View>

                        <View className='mt-4 mx-8 h-80 border-white border-2 rounded-xl p-3'>
                            <Swiper>
                            {
                                imagePicker.length
                                ?
                                imagePicker.map((item, index) => (
                                    <View className='border-2 border-[#b0b0b0] border-dashed' key={index}>
                                        <Image source={{uri: item.assets[0].uri}} className='h-full w-full'></Image> 
                                    </View>
                                ))
                                :
                                <View className='border-2 border-[#b0b0b0] border-dashed flex-1'>
                                    <Image source={blankImg} className='h-full w-full'></Image> 
                                </View>
                            }
                            </Swiper>
                        </View>
                    </ScrollView>
                </View>
                <Pressable 
                    onPress={handleAdd} 
                    className='flex flex-row justify-between items-center w-[40%] mx-auto bg-btn_color py-2 px-11 rounded-2xl' 
                    style={style.shadow}
                >
                    <Icon name="save" size={24} color='#CCC' solid></Icon>
                    <Text className='text-[#CCC] text-lg font-semibold'>LƯU</Text>
                </Pressable>
            </SafeAreaView>

            <Footer navigation={navigation} id={1}/>
        </View>
    )
}

export default FormFuel