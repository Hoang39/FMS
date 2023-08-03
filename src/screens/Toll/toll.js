import { useState, useEffect, useLayoutEffect } from 'react'
import { Pressable, View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row } from 'react-native-table-component';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'
import { getVehiclesList } from '../../api/Fuel/fuel';
import { getRegistryCenterList } from '../../api/Registry/registry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { deleteToll, getTollList } from '../../api/Toll/toll';

const Toll = ({ navigation }) => {
    const removeBtn = (id, vehicle_id) => (
        <Pressable 
            onPress={async () => {
                const token = await AsyncStorage.getItem('token')
                const res = await deleteToll(token, id, vehicle_id)

                if (res.status) {
                    Alert.alert('Thành công', 'Bạn xóa hồ sơ thành công')
                    setLoadingAfterRemove(!loadingAfterRemove)
                }
            }}
            className='flex flex-row items-center justify-between border-2 border-[#FF0000] rounded p-1 mr-1'
        >
            <Icon name="trash" size={10} color='#FF0000'></Icon>
            <Text className='text-[#ff0000] text-xs'>Xóa</Text>
        </Pressable>
    )
    const tableHead = ['Trung tâm đăng kiểm','Ngày đăng kiểm','Ngày hết hạn','']
    const [tableData, setTableData] = useState([])

    const [loading, setLoading] = useState(true)
    const [loadingAfterRemove, setLoadingAfterRemove] = useState(true)

    const flexArr = [3,2,2,1]

    const [openPlate, setOpenPlate] = useState(false);
    const [valuePlate, setValuePlate] = useState('');
    const [itemsPlate, setItemsPlate] = useState([]);

    const isFocused = useIsFocused();

    const getCenterName = (registryCenterList, id) => {
        const res = registryCenterList.filter(item => item.id === id)
        if (res.length) 
            return res[0].name
        return "Chưa có tên"
    }

    const handleVehicle = async (item) => {
        if (isFocused) {
            const token = await AsyncStorage.getItem('token')
            const res = await getTollList(token, item)
            
            if (res === undefined) {
                await AsyncStorage.removeItem('token')
                Alert.alert('Thông báo','Tài khoản hết thời gian sử dụng. Vui lòng đăng nhập lại')
                navigation.navigate('SignIn')
            }

            Alert.alert('Thông báo', res.mess)

            if (res.status) {
                const registryCenterList = await getRegistryCenterList(token)
                
                setTableData(res.data.map(resItem => [
                    getCenterName(registryCenterList, resItem.provider_documents_id),
                    resItem.last_register_date.slice(0, 10),
                    resItem.date_expired.slice(0, 10),
                    removeBtn(resItem.id, item),
                    resItem.id,
                    item
                ]))
            }
            else {
                setTableData([])
            }
        }
    }

    useLayoutEffect(() => {
        setLoading(true)
    },[isFocused])

    useEffect(() => {
        (async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem('token')

            const itemsPlateList = await getVehiclesList(token)
            setItemsPlate(itemsPlateList.map(item => ({value: item.vehicle_id, label: item.plate})))
            setLoading(false)
        })();
    }, [isFocused, loadingAfterRemove]);

    DropDownPicker.setListMode('MODAL')

    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
                <Header navigation={navigation} title='LỊCH SỬ PHÍ ĐƯỜNG BỘ'/>

                <View className='mt-2 mx-8' style={{ zIndex: 100 }}>
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
                                <Pressable
                                    key={index}
                                    onPress={() => 
                                        navigation.navigate('DetailToll', {
                                            id: item[4],
                                            vehicle_id: item[5]
                                        }
                                    )}
                                >
                                    <Row 
                                        data={item.slice(0, -2)}
                                        flexArr={flexArr}
                                        textStyle={style.text}
                                        style={{...(index%2===0 && {backgroundColor: '#EFEFEF'})}}
                                        numberOfLines={1}
                                    />
                                </Pressable>
                            ))
                        }    
                        </Table>
                    </ScrollView>
                </View>

                <Pressable 
                    onPress={() => navigation.navigate('FormToll')} 
                    className='flex flex-row items-center ml-auto mr-10 bg-sub_bg_color py-3 px-5 rounded-xl space-x-4' 
                    style={style.shadow}
                >
                    <Icon name="plus" size={22} color='#259EE2' ></Icon>
                    <Text className='text-bg_color text-lg font-semibold'>Tạo mới</Text>
                </Pressable>
            </SafeAreaView>
            <Footer navigation={navigation} id={2}/>
        </View>
    )
}

export default Toll