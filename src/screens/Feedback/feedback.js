import { useState } from 'react'
import { Pressable, View, Text, StatusBar, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

import logo from '../../assets/images/logo.png'

const Feedback = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <View className='flex justify-between mb-4'>
                <StatusBar />
                <Header navigation={navigation} title='PHẢN HỒI THÔNG TIN'/>
                <View>
                    <View className='bg-white p-8 rounded-full mx-auto my-8'>
                        <Image source={logo}></Image>
                    </View>
                    <Text className='text-[#333] text-3xl font-semibold mx-auto'>
                        Phản hồi
                    </Text>
                    <TextInput
                        className='bg-white px-6 py-6 rounded-xl border mx-8 mt-4'
                        placeholder="Nội dung mà bạn muốn phản hồi ..."
                        style={style.shadow && {textAlignVertical: 'top'}}
                        multiline={true}
                        numberOfLines = {12}
                    />
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        className='bg-white border border-bg_color px-6 py-3 rounded-xl mx-auto mt-6'
                        style={style.shadow}
                    >
                        <Text className='text-bg_color font-semibold text-base'>GỬI PHẢN HỒI</Text>
                    </Pressable>
                </View>
            </View>
            <Footer navigation={navigation} id={0}/>
        </View>
    )
}

export default Feedback;