import { useState, useEffect } from 'react'
import { Pressable, View, Text, SafeAreaView, ScrollView, TextInput, Image } from 'react-native'
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

const FormToll = ({ navigation }) => {
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

    const [openPeriod, setOpenPeriod] = useState(false);
    const [valuePeriod, setValuePeriod] = useState('');
    const [itemsPeriod, setItemsPeriod] = useState([
        {value: '1', label: '1 tháng'},
        {value: '2', label: '3 tháng'},
        {value: '3', label: '6 tháng'},
        {value: '4', label: '12 tháng'},
        {value: '5', label: '18 tháng'},
        {value: '6', label: '24 tháng'},
        {value: '7', label: '30 tháng'}
    ]);

    const [openVehicle, setOpenVehicle] = useState(false);
    const [valueVehicle, setValueVehicle] = useState('');
    const [itemsVehicle, setItemsVehicle] = useState([
        {value: '1', label: 'Xe chở người dưới 10 chỗ đăng ký tên cá nhân'},
        {value: '2', label: 'Xe chở người dưới 10 chỗ (trừ xe đăng ký tên cá nhân); xe tải, xe ô tô chuyên dùng có khối lượng toàn bộ dưới 4.000 kg; các loại xe buýt; xe chở hàng và xe chở người 4 bánh có gắn động cơ'},
        {value: '3', label: 'Xe chở người từ 25 chỗ đến dưới 40 chỗ; xe tải, xe ô tô chuyên dùng có khối lượng toàn bộ từ 8.500 kg đến dưới 13.000 kg'},
        {value: '4', label: 'Xe chở người từ 40 chỗ trở lên; xe tải, xe ô tô chuyên dùng có khối lượng toàn bộ từ 13.000 kg đến dưới 19.000 kg; xe đầu kéo có khối lượng bản thân cộng với khối lượng cho phép kéo theo đến dưới 19.000 kg'},
        {value: '5', label: 'Xe tải, xe ô tô chuyên dùng có khối lượng toàn bộ từ 19.000 kg đến dưới 27.000 kg; xe đầu kéo có khối lượng bản thân cộng với khối lượng cho phép kéo theo từ 19.000 kg đến dưới 27.000 kg'},
        {value: '6', label: 'Xe tải, xe ô tô chuyên dùng có khối lượng toàn bộ từ 27.000 kg trở lên; xe đầu kéo có khối lượng bản thân cộng với khối lượng cho phép kéo theo từ 27.000 kg đến dưới 40.000 kg'},
        {value: '7', label: 'Xe ô tô đầu kéo có khối lượng bản thân cộng với khối lượng cho phép kéo theo từ 40.000 kg trở lên'}
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
                <Header navigation={navigation} title='PHÍ ĐƯỜNG BỘ'/>

                <View className='h-[75%]'>
                    <ScrollView nestedScrollEnabled={true} style={{flex: 1}} contentContainerStyle={{flexGrow:1}}>
                        <View className='flex flex-row mt-2 mx-8 justify-between space-x-4' style={{ zIndex: 100 }}>
                            <View className='flex-1'>
                                <Text className='px-2 py-2 font-medium'>Tên trung tâm phí đường bộ <Text className='text-[#FF0000]'>*</Text></Text>
                                <DropDownPicker
                                    searchable={true}
                                    searchPlaceholder="Tìm kiếm"
                                    open={openRegistration}
                                    value={valueRegistration}
                                    items={itemsRegistration}
                                    setOpen={setOpenRegistration}
                                    setValue={setValueRegistration}
                                    setItems={setItemsRegistration}
                                    placeholder='Trung tâm phí đường bộ'
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

                        <View className='mt-2 mx-8' style={{ zIndex: 80 }}>
                            <Text className='px-2 py-2 font-medium'>Kỳ hạn đóng phí (tháng) <Text className='text-[#FF0000]'>*</Text></Text>
                            <DropDownPicker
                                open={openPeriod}
                                value={valuePeriod}
                                items={itemsPeriod}
                                setOpen={setOpenPeriod}
                                setValue={setValuePeriod}
                                setItems={setItemsPeriod}
                                placeholder='Kỳ hạn đóng phí'
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
                                placeholder='Chọn loại phương tiện'
                                placeholderStyle={{color:'#B0B0B0'}}
                                dropDownContainerStyle={{ borderColor:'white', position: 'relative', top: 0 }}
                                listItemContainerStyle={{ marginVertical: 4 }}
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
                    onPress={() => navigation.navigate('Toll')} 
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

export default FormToll