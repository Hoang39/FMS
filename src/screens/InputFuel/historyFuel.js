import { useEffect, useState, useLayoutEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Pressable, View, Text, SafeAreaView, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'
import { getActionList } from '../../api/Fuel/fuel';

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

const getPreviousMonth = () => {
    let currentDate = new Date();

    let previousMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    let previousMonthMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    return new Date(previousMonthYear, previousMonthMonth, 1);
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
    const tableHead = ['Cơ sở xăng dầu','Thời gian nạp/xả','Lưu lượng','Chế độ','']
    const flexArr = [4,4,3,2,2]

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [dateStart, setDateStart] = useState(formatDate(getPreviousMonth(), '/'))
    const [dateEnd, setDateEnd] = useState(formatDate(new Date(), '/'))

    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        setLoading(true)
    },[isFocused])

    useEffect(() => {
        (async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem('token')
            const actionList = await getActionList(token, { from_date: dateStart, to_date: dateEnd })
            setTableData(actionList.map(item => [item.location_name, item.trk_time, item.volume_change, item.type === '1'? 'Xả' : 'Nạp', removeBtn(item.id)]));
            setLoading(false)
        })()
    },[dateStart, dateEnd, isFocused])

    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
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
                            minimumDate={getPreviousMonth()}
                            maximumDate={new Date()}
                            isDarkModeEnabled={true}
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {setDatePicker(formatDate(date)); setDatePickerVisibility(false)}}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            setDateStart(datePicker)
                            setDateEnd(datePicker)
                        }}
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
                            loading
                            ?
                            <ActivityIndicator size="large" />
                            :
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
                    className='flex flex-row items-center ml-auto mr-10 bg-sub_bg_color py-3 px-5 rounded-xl space-x-4' 
                    style={style.shadow}
                >
                    <Icon name="plus" size={22} color='#259EE2' ></Icon>
                    <Text className='text-bg_color text-lg font-semibold'>Tạo mới</Text>
                </Pressable>
            </SafeAreaView>

            <Footer navigation={navigation} id={1}/>
        </View>
    )
}

export default HistoryFuel;