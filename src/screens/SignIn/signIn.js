import { useEffect, useState } from 'react'

import { View, Image, TextInput, Pressable, Text, Alert, BackHandler } from "react-native"
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';

import logo from '../../assets/images/logo.png'
import { loginAction, loginInfo } from '../../api/User/user';

const SignIn = ({ navigation }) => {
    const [formValue, setFormValue] = useState(null)
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress',() => {
            Alert.alert('Thông báo', 'Bạn có muốn thoát khỏi ứng dụng không?', [
                { text: 'Hủy', onPress: () => null, style: 'cancel'},
                {text: 'Đồng ý', onPress: () => BackHandler.exitApp()},
            ]);
            return true;
        });

        return () => backHandler.remove()
    })

    const handleChange = (e, name) => {
        setFormValue({
            ...formValue,
            [name]: e.nativeEvent.text
        })
    }

    const handleLogin = async () => {
        if (!formValue || !formValue.user_name)
            Alert.alert('Cảnh báo', 'Bạn chưa điền mục tên đăng nhập!')

        else if (!formValue.password)
            Alert.alert('Cảnh báo', 'Bạn chưa điền mục mật khẩu!')

        else {
            formValue.password = md5(formValue.password)
            const rawRes = await loginAction(formValue)
            const res = JSON.parse(rawRes.trimStart())

            if (res.status) {
                Alert.alert('Thành công', 'Bạn đăng nhập thành công')
                await AsyncStorage.setItem('token', res.data.token)
                navigation.navigate('InputFuel')
            }
            else Alert.alert('Cảnh báo', 'Tài khoản không hợp lệ!')
        }
    }

    return (
        <View className='bg-bg_color h-full flex items-center justify-between'> 
            <View className='flex items-center'>
                <View className='bg-white rounded-full p-7 m-16'>
                    <Image source={logo}></Image>
                </View>
                <TextInput 
                    onChange={e => handleChange(e, 'user_name')}
                    className="bg-white rounded-3xl w-80 py-3 my-4 px-8"
                    placeholder="Tên đăng nhập"
                    placeholderTextColor='#333' 
                />
                <TextInput 
                    onChange={e => handleChange(e, 'password')}
                    className="bg-white rounded-3xl w-80 py-3 my-4 px-8"
                    placeholder="Mật khẩu" 
                    placeholderTextColor='#333' 
                    secureTextEntry={true}
                />
                <View className='flex flex-row mt-2 ml-6 mr-auto space-x-4'>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text>Nhớ mật khẩu</Text>
                </View>

                <Pressable onPress={handleLogin} className='bg-sub_bg_color py-3 px-16 my-8 rounded-3xl' style='elevation: 5'>
                    <Text className='text-bg_color text-2xl font-semibold mx-auto'>Đăng nhập</Text>
                </Pressable>

                <View className='flex flex-row space-x-4 items-center m-6'>
                    <View className='bg-[#B0E1F1] rounded-full p-2 -scale-x-100'>
                        <Icon name="phone"></Icon>
                    </View>
                    <Text className='font-medium text-lg'>Hotline: 19006061</Text>
                </View>
            </View>

            <Text className='mx-auto my-8 font-medium'>2018 Magiwan - www.magiwan.com</Text>
        </View>
    )
}

export default SignIn