import { useState, useEffect } from 'react'
import { Pressable, View, Text, ScrollView, TextInput, Image, Alert } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker'
import Checkbox from 'expo-checkbox';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

import blankImg from '../../assets/images/blankImg.png'
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRegistryCenterList } from '../../api/Registry/registry';
import { getVehiclesList } from '../../api/Fuel/fuel';
import { getVehiclePeriodTollList, getVehicleTollList, insertToll, updateToll, viewToll } from '../../api/Toll/toll';
import { ActivityIndicator } from 'react-native';

const formatDate = (date, specChar = '-') => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month; 
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join(specChar);
}

const getPreviousMonth = () => {
    let currentDate = new Date();

    let previousMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    let previousMonthMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    return new Date(previousMonthYear, previousMonthMonth, 1);
}

const DetailToll = ({ navigation, route }) => {
    const { id, vehicle_id } = route.params;

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();

    const [imagePicker, setImagePicker] = useState([]);

    const [isDatePickerStart, setIsDatePickerStart] = useState(false);
    const [datePickerStart, setDatePickerStart] = useState(null)

    const [isDatePickerEnd, setIsDatePickerEnd] = useState(false);
    const [datePickerEnd, setDatePickerEnd] = useState(null)

    const [openRegistration, setOpenRegistration] = useState(false);
    const [valueRegistration, setValueRegistration] = useState('');
    const [itemsRegistration, setItemsRegistration] = useState([]);

    const [openDoer, setOpenDoer] = useState(false);
    const [valueDoer, setValueDoer] = useState('');
    const [itemsDoer, setItemsDoer] = useState([]);

    const [openVehicle, setOpenVehicle] = useState(false);
    const [valueVehicle, setValueVehicle] = useState('');
    const [itemsVehicle, setItemsVehicle] = useState([]);

    const [openPeriod, setOpenPeriod] = useState(false);
    const [valuePeriod, setValuePeriod] = useState('');
    const [itemsPeriod, setItemsPeriod] = useState([
        {value: '1', label: '1 tháng'},
        {value: '3', label: '3 tháng'},
        {value: '6', label: '6 tháng'},
        {value: '12', label: '12 tháng'},
        {value: '18', label: '18 tháng'},
        {value: '24', label: '24 tháng'},
        {value: '30', label: '30 tháng'}
    ]);

    const [stores, setStores] = useState(null)
    const [vehicles, setVehicles] = useState(null)

    const handleStore = (item) => {
        const store = stores.filter((sto) => sto.id === item)[0]
        if (store) {
            setFormToll({
                ...formToll,
                'provider_documents_id': store.id
            })
        }
    }

    const handleVehicle = (item) => {
        const vehicle = vehicles.filter((veh) => veh.vehicle_id === item)[0]
        if (vehicle) {
            setFormToll({
                ...formToll,
                'vehicle_id': vehicle.vehicle_id
            })
        }
    }

    const handleChange = (event, name) => {
        setFormToll({
            ...formToll,
            [name]: event.nativeEvent.text
        })
    }

    const handleUpdate = async () => {
        const token = await AsyncStorage.getItem('token')
        formToll.id = id
        formToll.vehicle_id = vehicle_id
        formToll.is_remind_issue = "0"
        formToll.is_remind_email = isChecked? "1" : "0"

        const res = await updateToll(token, formToll)

        if (res.status) {
            Alert.alert('Thành công', 'Bạn chỉnh sửa hồ sơ thành công')
            navigation.navigate('Toll');
        }
        else {
            Alert.alert('Thất bại', 'Bạn cần điền đầy đủ tất cả các trường')
        }
    }

    useEffect(() => {
        (async () => {
            if (valuePeriod && valueVehicle && Object.keys(formToll).length) {
                const token = await AsyncStorage.getItem('token')

                const vehiclePeriodTollList = await getVehiclePeriodTollList(token)
                const res = vehiclePeriodTollList.filter(item => item.period === valuePeriod && item.car_type_id === valueVehicle)
                
                setFormToll({
                    ...formToll,
                    'vehicle_road_fees_id': res[0].id
                })
            }
        })()
    },[valuePeriod, valueVehicle])

    const [isChecked, setChecked] = useState(false);
    const [formToll, setFormToll] = useState({})

    useEffect(() => {
        if (datePickerStart) 
            setFormToll({
                ...formToll,
                'last_register_date': `${datePickerStart.replace(/-/g,'/')} 00:00:00`
            })
    },[datePickerStart])

    useEffect(() => {
        if (datePickerEnd) 
            setFormToll({
                ...formToll,
                'date_expired': `${datePickerEnd.replace(/-/g,'/')} 00:00:00`
            })
    },[datePickerEnd])

    useEffect(() => {
        if (datePickerEnd && datePickerStart) {
            if (datePickerEnd.localeCompare(datePickerStart) !== 1) {
                Alert.alert('Lỗi', 'Chọn ngày hết hạn lớn hơn ngày đăng ký')
                setDatePickerEnd(null)
            }
        }
    },[datePickerStart, datePickerEnd])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)

            const token = await AsyncStorage.getItem('token')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted')
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')

            const registryCenterList = await getRegistryCenterList(token)
            const vehicleList = await getVehiclesList(token)
            const vehicleType = await getVehicleTollList(token)

            setStores(registryCenterList)
            setVehicles(vehicleList)

            setItemsRegistration(registryCenterList.map(item => ({
                value: item.id,
                label: item.name
            })))

            setItemsDoer(vehicleList.map(item => ({
                value: item.vehicle_id, 
                label: item.plate
            })))

            setItemsVehicle(vehicleType.map(item => ({
                value: item.id,
                label: item.name
            })))

            const res = await viewToll(token, id, vehicle_id)
            const vehiclePeriodTollList = await getVehiclePeriodTollList(token)
            const vehiclePeriodToll = vehiclePeriodTollList.filter(item => item.id === res.vehicle_road_fees_id)[0]

            setValueRegistration(res.provider_documents_id)
            setValueDoer(vehicle_id)
            setValuePeriod(vehiclePeriodToll.period)
            setValueVehicle(vehiclePeriodToll.car_type_id)
            setDatePickerStart(res.last_register_date.slice(0, 10))
            setDatePickerEnd(res.date_expired.slice(0, 10))
            setChecked(res.is_remind_email === "1")

            setFormToll(
                (({ 
                    provider_documents_id, 
                    is_remind_email,
                    last_register_date, 
                    date_expired, 
                    document_id, 
                    fee, 
                    user_name, 
                    vehicle_road_fees_id,
                    file_attach
                }) => 
                ({ provider_documents_id, 
                    is_remind_email,
                    last_register_date, 
                    date_expired, 
                    document_id, 
                    fee, 
                    user_name, 
                    vehicle_road_fees_id,
                    file_attach 
                }))(res)
            )

            setLoading(false)
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [3,4],
            quality: 1,
        })

        if (!result.canceled)
            setImagePicker(imagePicker.concat([result.assets[0].uri]));
    }

    const photographImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3,4],
            quality: 1,
        })

        if (!result.canceled)
            setImagePicker(imagePicker.concat([result.assets[0].uri]));
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
                <Header navigation={navigation} title='PHÍ ĐƯỜNG BỘ'/>

                <View className='h-[75%]'>
                {
                    loading
                    ?
                    <ActivityIndicator size="large" />
                    :
                    <ScrollView nestedScrollEnabled={true} style={{flex: 1}} contentContainerStyle={{flexGrow:1}}>
                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4' style={{ zIndex: 100 }}>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Tên trung tâm đăng kiểm <Text className='text-[#FF0000]'>*</Text></Text>
                                <DropDownPicker
                                    searchable={true}
                                    searchPlaceholder="Tìm kiếm"
                                    open={openRegistration}
                                    value={valueRegistration}
                                    items={itemsRegistration}
                                    setOpen={setOpenRegistration}
                                    setValue={setValueRegistration}
                                    setItems={setItemsRegistration}
                                    placeholder='Trung tâm đăng kiểm'
                                    placeholderStyle={{color:'#B0B0B0'}}
                                    dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                    className='border-white'
                                    style={style.shadow}
                                    onChangeValue={item => handleStore(item)}
                                />
                            </View>
                        </View>

                        <View className='mt-2 mx-8' style={{ zIndex: 90 }}>
                            <Text className='px-2 py-2 font-medium'>Mã phương tiện <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                searchable={true}
                                searchPlaceholder="Tìm kiếm"
                                open={openDoer}
                                value={valueDoer}
                                items={itemsDoer}
                                setOpen={setOpenDoer}
                                setValue={setValueDoer}
                                setItems={setItemsDoer}
                                placeholder='Nhập mã phương tiện'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                className='border-white'
                                style={style.shadow}
                                onChangeValue={item => handleVehicle(item)}
                            />
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số phiếu <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    onChange={(e) => handleChange(e, 'document_id')}
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập phiếu"
                                    style={style.shadow}
                                    value={formToll.document_id}
                                />
                            </View>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Phí dịch vụ <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    onChange={(e) => handleChange(e, 'fee')}
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập phí dịch vụ"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                    value={formToll.fee}
                                />
                            </View>
                        </View>

                        <View className='mt-2 mx-8' style={{ zIndex: 80 }}>
                            <Text className='px-2 py-2 font-medium'>Kỳ hạn đóng phí (tháng) <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                open={openPeriod}
                                value={valuePeriod}
                                items={itemsPeriod}
                                setOpen={setOpenPeriod}
                                setValue={setValuePeriod}
                                setItems={setItemsPeriod}
                                placeholder='Nhập kỳ hạn đóng phí'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                className='border-white'
                                style={style.shadow}
                            />
                        </View>

                        <View className='mt-2 mx-8' style={{ zIndex: 70 }}>
                            <Text className='px-2 py-2 font-medium'>Loại phương tiện <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                open={openVehicle}
                                value={valueVehicle}
                                items={itemsVehicle}
                                setOpen={setOpenVehicle}
                                setValue={setValueVehicle}
                                setItems={setItemsVehicle}
                                placeholder='Nhập loại phương tiện'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                className='border-white'
                                style={style.shadow}
                            />
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Ngày đăng ký <Text className='text-[#FF0000]'>*</Text></Text>
                                <Pressable 
                                    onPress={() => setIsDatePickerStart(true)}
                                    className='bg-white rounded-lg flex flex-row justify-between items-center px-2 py-3.5' style={style.shadow}
                                >
                                    <Text className='text-text_color'>
                                        {datePickerStart ? datePickerStart: 'Ngày đăng ký'}
                                    </Text>
                                    <Icon name="calendar" size={20}></Icon>
                                    <DateTimePickerModal
                                        minimumDate={getPreviousMonth()}
                                        maximumDate={new Date()}
                                        isDarkModeEnabled={true}
                                        isVisible={isDatePickerStart}
                                        mode="date"
                                        onConfirm={(date) => {setDatePickerStart(formatDate(date)); setIsDatePickerStart(false)}}
                                        onCancel={() => setIsDatePickerStart(false)}
                                    />
                                </Pressable>
                            </View>

                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Ngày hết hạn <Text className='text-[#FF0000]'>*</Text></Text>
                                <Pressable 
                                    onPress={() => setIsDatePickerEnd(true)}
                                    className='bg-white rounded-lg flex flex-row justify-between items-center px-2 py-3.5' style={style.shadow}
                                >
                                    <Text className='text-text_color'>
                                        {datePickerEnd ? datePickerEnd: 'Ngày hết hạn'}
                                    </Text>
                                    <Icon name="calendar" size={20}></Icon>
                                    <DateTimePickerModal
                                        minimumDate={getPreviousMonth()}
                                        isDarkModeEnabled={true}
                                        isVisible={isDatePickerEnd}
                                        mode="date"
                                        onConfirm={(date) => {setDatePickerEnd(formatDate(date)); setIsDatePickerEnd(false)}}
                                        onCancel={() => setIsDatePickerEnd(false)}
                                    />
                                </Pressable>
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
                                        <Image source={{uri: item}} className='h-full w-full'></Image> 
                                    </View>
                                ))
                                :
                                <View className='border-2 border-[#b0b0b0] border-dashed flex-1'>
                                    <Image source={blankImg} className='h-full w-full'></Image> 
                                </View>
                            }
                            </Swiper>
                        </View>

                        <View className='flex flex-row my-6 mx-8 space-x-4'>
                            <Checkbox
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? '#4630EB' : undefined}
                            />
                            <Text className='italic text-white'>Tự động nhắc khi hết hạn</Text>
                        </View>
                    </ScrollView>
                }
                </View>
                <Pressable 
                    onPress={handleUpdate} 
                    className='flex flex-row justify-between items-center w-[60%] mx-auto bg-btn_color py-2 px-11 rounded-2xl' 
                    style={style.shadow}
                >
                    <Icon name="save" size={24} color='#CCC' solid></Icon>
                    <Text className='text-[#CCC] text-lg font-semibold'>CHỈNH SỬA</Text>
                </Pressable>
            </SafeAreaView>

            <Footer navigation={navigation} id={2}/>
        </View>
    )
}

export default DetailToll