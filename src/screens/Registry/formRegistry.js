import { useState, useEffect } from 'react'
import { Pressable, View, Text, StatusBar, ScrollView, TextInput, Image } from 'react-native'
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

const FormRegistry = ({ navigation }) => {
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
    const [itemsRegistration, setItemsRegistration] = useState([
        {value: '1', label: 'Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh'},
        {value: '2', label: 'Trung Tâm đăng kiểm xe cơ giới 9802D - Bắc Giang'},
        {value: '3', label: 'Trung tâm đăng kiểm xe cơ giới 9401V - Bạc Liêu'},
        {value: '4', label: 'Công ty cổ phần đăng kiểm Quảng Nam - 9201D'},
        {value: '5', label: 'Trung Tâm đăng kiểm xe cơ giới 8602D - Bình Thuận'},
        {value: '6', label: 'Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh'},
        {value: '7', label: 'Trung Tâm đăng kiểm xe cơ giới 9802D - Bắc Giang'},
        {value: '8', label: 'Trung tâm đăng kiểm xe cơ giới 9401V - Bạc Liêu'},
        {value: '9', label: 'Công ty cổ phần đăng kiểm Quảng Nam - 9201D'},
        {value: '10', label: 'Trung Tâm đăng kiểm xe cơ giới 8602D - Bình Thuận'},
    ]);

    const [openDoer, setOpenDoer] = useState(false);
    const [valueDoer, setValueDoer] = useState('');
    const [itemsDoer, setItemsDoer] = useState([
        {value: '1', label: 'Tổng cục đường bộ'},
        {value: '2', label: 'streamax'},
    ]);

    const [isChecked, setChecked] = useState(false);

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
                <Header navigation={navigation} title='ĐĂNG KIỂM'/>

                <View className='h-[75%]'>
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
                                />
                            </View>
                        </View>

                        <View className='mt-2 mx-8' style={{ zIndex: 90 }}>
                            <Text className='px-2 py-2 font-medium'>Người thực hiện <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                open={openDoer}
                                value={valueDoer}
                                items={itemsDoer}
                                setOpen={setOpenDoer}
                                setValue={setValueDoer}
                                setItems={setItemsDoer}
                                placeholder='Người thực hiện'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                className='border-white'
                                style={style.shadow}
                            />
                        </View>

                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4'>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Số phiếu kiểm định <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập phiếu kiểm định"
                                    style={style.shadow}
                                />
                            </View>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Phí dịch vụ <Text className='text-[#FF0000]'>*</Text></Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg'
                                    placeholder="Nhập phí dịch vụ"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
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
                </View>
                <Pressable 
                    onPress={() => navigation.navigate('Registry')} 
                    className='flex flex-row justify-between items-center w-[40%] mx-auto bg-btn_color py-2 px-11 rounded-2xl' 
                    style={style.shadow}
                >
                    <Icon name="save" size={24} color='#CCC' solid></Icon>
                    <Text className='text-[#CCC] text-lg font-semibold'>LƯU</Text>
                </Pressable>
            </SafeAreaView>

            <Footer navigation={navigation} id={2}/>
        </View>
    )
}

export default FormRegistry