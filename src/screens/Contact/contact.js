import { View, Text, StatusBar, Image, SafeAreaView } from 'react-native'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import logo from '../../assets/images/logo.png'

const Contact = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
                <StatusBar />
                <Header navigation={navigation} title='LIÊN HỆ'/>

                <View className='bg-white p-8 rounded-full mx-auto my-4'>
                    <Image source={logo}></Image>
                </View>

                <View className='bg-white p-8 rounded-2xl mx-auto my-8 mx-10 space-y-4'>
                    <Text className='mx-auto font-bold text-2xl pb-4'>Liên hệ</Text>
                    <View className='flex flex-row items-center'>
                        <Text className='font-medium text-base w-1/3'>Tên:</Text>
                        <Text className='w-2/3'>Công ty TNHH A.D.A</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='font-medium text-base w-1/3'>Sđt:</Text>
                        <Text className='w-2/3'>1900 6061</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='font-medium text-base w-1/3'>Địa chỉ:</Text>
                        <Text className='w-2/3'>106 - 108 Thống Nhất, Tân Thành, Tân Phú</Text>
                    </View>
                </View>
            </SafeAreaView>

            <Footer navigation={navigation} id={0}/>
        </View>
    )
}

export default Contact;