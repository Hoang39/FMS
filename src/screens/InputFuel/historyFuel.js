import { useState } from 'react'
import { Pressable, View, Text, StatusBar, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row } from 'react-native-table-component';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

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

const HistoryFuel = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [datePicker, setDatePicker] = useState(null)

    const removeBtn = (index) => (
        <Pressable className='flex flex-row items-center justify-between border-2 border-[#FF0000] rounded p-1 mr-1'>
            <Icon name="trash" size={10} color='#FF0000'></Icon>
            <Text className='text-[#ff0000] text-xs'>Xóa</Text>
        </Pressable>
    )
    const tableHead = ['Cơ sở xăng dầu','Thời gian nạp','Tổng tiền','Chế độ','']
    const tableData = [
        ['Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh','12h00 09/06/2023','1 000 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 9801S - Bắc Giang','12h00 09/06/2023','100 000','Xả',removeBtn(0)],
        ['Công ty cổ phần đăng kiểm Bắc Kạn - 9701D','12h00 09/06/2023','567 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 8802D - Vĩnh Phúc','23h59 09/06/2023','20 000 000','Xả',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh','12h00 09/06/2023','1 000 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 9801S - Bắc Giang','12h00 09/06/2023','100 000','Xả',removeBtn(0)],
        ['Công ty cổ phần đăng kiểm Bắc Kạn - 9701D','12h00 09/06/2023','567 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 8802D - Vĩnh Phúc','23h59 09/06/2023','20 000 000','Xả',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh','12h00 09/06/2023','1 000 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 9801S - Bắc Giang','12h00 09/06/2023','100 000','Xả',removeBtn(0)],
        ['Công ty cổ phần đăng kiểm Bắc Kạn - 9701D','12h00 09/06/2023','567 000','Nạp',removeBtn(0)],
        ['Trung Tâm đăng kiểm xe cơ giới 8802D - Vĩnh Phúc','23h59 09/06/2023','20 000 000','Xả',removeBtn(0)]
    ]
    const flexArr = [4,4,3,2,2]

    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <View className='flex justify-between mb-4'>
                <StatusBar />
                <Header navigation={navigation} title='LỊCH SỬ NẠP/XẢ'/>

                <View className='flex flex-row items-center mx-auto mt-4'>
                    <Pressable 
                        onPress={() => setDatePickerVisibility(true)}
                        className='bg-white rounded-l-lg flex flex-row justify-between items-center space-x-8 py-3.5 px-4 w-3/5' style={style.shadow}
                    >
                        <Text className='text-text_color font-medium'>
                            {datePicker ? datePicker: 'Ngày nạp/xả nhiên liệu'}
                        </Text>
                        <Icon name="calendar" size={20} color='#B0B0B0'></Icon>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {setDatePicker(formatDate(date)); setDatePickerVisibility(false)}}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </Pressable>
                    <Pressable 
                        className='bg-btn_color py-3.5 px-4 rounded-r-lg' 
                        style={style.shadow}
                    >
                        <Text className='text-white font-medium'>Tìm kiếm</Text>
                    </Pressable>
                </View>

                <View className='bg-white h-[65%]'>
                    <Table>
                        <Row data={tableHead} flexArr={flexArr} textStyle={style.textTitle}/>
                    </Table>
                    <ScrollView>
                        <Table>
                        {
                            tableData.map((item, index) => (
                                <Row 
                                    key={index}
                                    data={item}
                                    flexArr={flexArr}
                                    textStyle={style.text}
                                    style={{...(index%2===0 && {backgroundColor: '#EFEFEF'})}}
                                    numberOfLines={1}
                                />
                            ))
                        }    
                        </Table>
                    </ScrollView>
                </View>
                
                <Pressable 
                    onPress={() => navigation.navigate('FormFuel')} 
                    className='flex flex-row items-center ml-auto mr-10 bg-sub_bg_color py-3 px-5 my-3 rounded-xl space-x-4' 
                    style={style.shadow}
                >
                    <Icon name="plus" size={22} color='#259EE2' ></Icon>
                    <Text className='text-bg_color text-lg font-semibold'>Tạo mới</Text>
                </Pressable>
            </View>

            <Footer navigation={navigation} id={1}/>
        </View>
    )
}

export default HistoryFuel;