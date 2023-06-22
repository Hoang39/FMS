import { View, Image, TextInput, Pressable, Text } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';

import logo from '../../assets/images/logo.png'

const SignIn = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex items-center justify-between'> 
            <View className='flex items-center'>
                <View className='bg-white rounded-full p-7 m-16'>
                    <Image source={logo}></Image>
                </View>
                <TextInput 
                    className="bg-white rounded-3xl w-80 py-3 my-4 px-8"
                    placeholder="Tên đăng nhập"
                    placeholderTextColor='#333' 
                />
                <TextInput 
                    className="bg-white rounded-3xl w-80 py-3 my-4 px-8"
                    placeholder="Mật khẩu" 
                    placeholderTextColor='#333' 
                    secureTextEntry={true}
                />

                <Pressable onPress={() => navigation.navigate('InputFuel')} className='bg-sub_bg_color py-3 px-16 my-8 rounded-3xl' style='elevation: 5'>
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