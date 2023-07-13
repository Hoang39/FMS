import {View, Text, Image, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../styles/style'

import logo from '../../assets/images/logo.png'
import avatar from '../../assets/images/avatar.png'

const SideMenu = ({ navigation }) => {
    const handleLogout = async () => {
        Alert.alert('Thành công', 'Bạn đăng xuất thành công')
        await AsyncStorage.removeItem('token')
        navigation.navigate('SignIn')
    }

    return (
        <View className='flex w-3/5 h-screen bg-white border-2 border-blue-200 pt-8'>
            <View className='flex items-center'>
                <Image source={logo} className='w-16 h-16'></Image>
                <View className='my-2 p-2 border-2 border-[#ccc] rounded-full overflow-hidden'>
                    <Image source={avatar} className='w-28 h-28'></Image>
                </View>
                <Text className='text-xl font-bold text-[#333]'>Đặng Văn Tiếp</Text>
            </View>

            <View className='flex mt-6'>
                <Pressable 
                    onPress={() => navigation.navigate('Profile')}
                    className='flex flex-row justify-between items-center py-4 px-4'
                >
                    <View className='flex flex-row justify-between items-center space-x-6'>
                        <Icon name='user' size={16} solid></Icon>
                        <Text className='text-base font-medium text-[#333]'>Thông tin</Text>
                    </View>
                    <Icon name='arrow-right' size={16}></Icon>
                </Pressable>

                <Pressable 
                
                    className='flex flex-row justify-between items-center py-4 px-4' 
                >
                    <View className='flex flex-row justify-between items-center space-x-6'>
                        <Icon name='power-off' size={16} solid></Icon>
                        <Text className='text-base font-medium text-[#333]'>Cấu hình</Text>
                    </View>
                    <Icon name='arrow-right' size={16}></Icon>
                </Pressable>

                <Pressable 
                    onPress={() => navigation.navigate('Contact')}
                    className='flex flex-row justify-between items-center py-4 px-4' 
                >
                    <View className='flex flex-row justify-between items-center space-x-6'>
                        <Icon name='phone' size={16} solid></Icon>
                        <Text className='text-base font-medium text-[#333]'>Liên hệ</Text>
                    </View>
                    <Icon name='arrow-right' size={16}></Icon>
                </Pressable>
            </View>

            <Pressable 
                onPress={handleLogout}
                className='flex flex-row items-center space-x-4 px-6 py-2.5 bg-bg_color rounded-xl mx-auto mb-32 mt-auto'
                style={styles.shadow}
            >
                <Icon name='door-closed' size={16} color='white'></Icon>
                <Text className='text-white text-base font-medium'>Đăng xuất</Text>
            </Pressable>
        </View>
    )
}

export default SideMenu