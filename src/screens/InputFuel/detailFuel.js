import { useState, useEffect } from 'react'
import { Pressable, View, Text, StatusBar, ScrollView, TextInput, Image } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

import blankImg from '../../assets/images/blankImg.png'

const formatDate = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
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

const DetailFuel = ({ navigation, id }) => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();

    const [imagePicker, setImagePicker] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [datePicker, setDatePicker] = useState(null)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [timePicker, setTimePicker] = useState(null)

    const [openPlate, setOpenPlate] = useState(false);
    const [valuePlate, setValuePlate] = useState('');
    const [itemsPlate, setItemsPlate] = useState([
        {label: '59B-12340', value: '59B-12340'},
        {label: '59B-12341', value: '59B-12341'},
        {label: '59B-12342', value: '59B-12342'},
        {label: '59B-12343', value: '59B-12343'},
        {label: '59B-12344', value: '59B-12344'},
        {label: '59B-12345', value: '59B-12345'},
        {label: '59B-12346', value: '59B-12346'},
        {label: '59B-12347', value: '59B-12347'},
        {label: '59B-12348', value: '59B-12348'},
        {label: '59B-12349', value: '59B-12349'},
    ]);

    const [openMode, setOpenMode] = useState(false);
    const [valueMode, setValueMode] = useState('');
    const [itemsMode, setItemsMode] = useState([
        {label: 'Nạp', value: 'Nạp'},
        {label: 'Xả', value: 'Xả'},
    ]);

    const [openStore, setOpenStore] = useState(false);
    const [valueStore, setValueStore] = useState('');
    const [itemsStore, setItemsStore] = useState([
        {value: '1', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '2', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '3', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '4', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '5', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '6', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '7', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '8', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
        {value: '9', label: 'Trạm xăng A.T Petrol - CHXD Gia Định'},
    ]);

    const [openFuel, setOpenFuel] = useState(false);
    const [valueFuel, setValueFuel] = useState('');
    const [itemsFuel, setItemsFuel] = useState([
        {value: '1', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '2', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '3', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '4', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '5', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '6', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '7', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '8', label: 'Castrol CRB 20W-50 CF-4'},
        {value: '9', label: 'Castrol CRB 20W-50 CF-4'},
    ]);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted')
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')
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
                <Header navigation={navigation} title='NẠP/XẢ NHIÊN LIỆU'/>

                <View className='h-[75%]'>
                    <ScrollView>
                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4' style={{ zIndex: 100 }}>
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
                                    dropDownContainerStyle={{ borderColor:'white' }}
                                    className='border-white'
                                    style={style.shadow}
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
                                    dropDownContainerStyle={{ borderColor:'white' }}
                                    className='border-white'
                                    style={style.shadow}
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
                                        isDarkModeEnabled={true}
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={(date) => {setDatePicker(formatDate(date)); setDatePickerVisibility(false)}}
                                        onCancel={() => setDatePickerVisibility(false)}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4' style={{ zIndex: 90 }}>
                            <View className='flex-1'>
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
                                    dropDownContainerStyle={{ borderColor:'white' }}
                                    className='border-white'
                                    style={style.shadow}
                                />
                            </View>
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
                                    dropDownContainerStyle={{ borderColor:'white' }}
                                    className='border-white'
                                    style={style.shadow}
                                />
                            </View>
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số km <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập số km"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số lít dầu <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
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

                        <Pressable 
                            onPress={() => pickOptions()}
                            className='mt-4 mx-8 h-80 border-white border-2 rounded-xl p-3'
                        >
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
                        </Pressable>
                    </ScrollView>
                </View>
                <Pressable 
                    onPress={() => navigation.navigate('HistoryFuel')} 
                    className='flex flex-row justify-between items-center w-[40%] mx-auto bg-btn_color py-2 px-11 my-3 rounded-2xl' 
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

export default DetailFuel