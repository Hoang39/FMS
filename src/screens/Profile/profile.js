import { useState } from 'react'
import { Pressable, View, Text, StatusBar, Image, Modal, TextInput, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'

import avatar from '../../assets/images/avatar.png'

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
                <StatusBar />
                <Header navigation={navigation} title='THÔNG TIN CÁ NHÂN'/>

                <View className='py-24 px-4 w-full flex flex-row items-center justify-between space-x-8 bg-[#2884B7]'>
                    <View className='border-2 border-[#ccc] rounded-full overflow-hidden'>
                        <Image source={avatar} className='w-40 h-40'></Image>
                    </View>
                    <View className='space-y-4'>
                        <Text className='text-white text-2xl font-semibold w-48'>Đặng Văn Tiếp</Text>
                        <Text className='text-white text-base w-48'>abc@gmail.com</Text>
                        <Text className='text-white text-base w-48'>0123456789</Text>
                    </View>
                </View>

                <View className='mt-8 space-y-8'>
                    <Pressable 
                        onPress={() => setModalVisible(!modalVisible)}
                        className='bg-sub_bg_color flex flex-row items-center justify-between py-4 px-6 rounded-xl mx-8' 
                        style={style.shadow}
                    >
                        <View className='flex flex-row items-center justify-between space-x-6'>
                            <Icon name='pen-nib' size={20} color='#259EE2'></Icon>
                            <Text className='text-bg_color text-lg font-semibold'>Chỉnh sửa</Text>
                        </View>
                        <Icon name='arrow-right' size={20} color='#259EE2'></Icon>
                    </Pressable>

                    <Pressable 
                        onPress={() => navigation.navigate('Feedback')}
                        className='bg-sub_bg_color flex flex-row items-center justify-between py-4 px-6 rounded-xl mx-8' 
                        style={style.shadow}
                    >
                        <View className='flex flex-row items-center justify-between space-x-6'>
                            <Icon name='comment' size={20} solid color='#259EE2'></Icon>
                            <Text className='text-bg_color text-lg font-semibold'>Phản hồi</Text>
                        </View>
                        <Icon name='arrow-right' size={20} solid color='#259EE2'></Icon>
                    </Pressable>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View className='justify-center bg-white my-auto mx-auto w-[90%] border border-bg_color rounded-xl'>
                        <View className='bg-bg_color py-4 rounded-xl'>
                            <Text className='text-white font-semibold text-2xl mx-auto'>Chỉnh sửa thông tin</Text>
                        </View>
                        <View className='mt-4 space-y-2 mx-8'>
                            <View>
                                <Text className='px-2 py-2 font-medium text-base text-bg_color'>Họ và tên</Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg border border-bg_color'
                                    placeholder="Nhập họ và tên"
                                    style={style.shadow}
                                />
                            </View>
                            <View>
                                <Text className='px-2 py-2 font-medium text-base text-bg_color'>Số điện thoại</Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg border border-bg_color'
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    style={style.shadow}
                                />
                            </View>
                            <View>
                                <Text className='px-2 py-2 font-medium text-base text-bg_color'>Tên đăng nhập</Text>
                                <TextInput
                                    className='bg-white px-2 py-3 rounded-lg border border-bg_color'
                                    placeholder="Nhập tên đăng nhập"
                                    style={style.shadow}
                                />
                            </View>
                        </View>
                        <View className='flex flex-row items-center justify-between mx-8 my-10'>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                className='bg-white border border-bg_color flex flex-row items-center justify-between px-6 py-3 rounded-xl space-x-2'
                                style={style.shadow}
                            >
                                <Icon name='backward' solid size={18} color='#259EE2'></Icon>
                                <Text className='text-bg_color font-medium text-base'>Quay lại</Text>
                            </Pressable>

                            <Pressable
                            
                                className='bg-bg_color border border-bg_color flex flex-row items-center justify-between px-6 py-3 rounded-xl space-x-2'
                                style={style.shadow}
                            >
                                <Icon name='pen-nib' solid size={18} color='white'></Icon>
                                <Text className='text-white font-medium text-base'>Cập nhật</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>

            <Footer navigation={navigation} id={0}/>

            {
                modalVisible 
                && 
                <BlurView
                    tint="light"
                    intensity={100}
                    className='absolute w-full h-full'
                />
            }      
        </View>
    )
}

export default Profile;