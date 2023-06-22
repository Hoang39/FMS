import { Pressable, ScrollView, View, Text, StatusBar } from 'react-native'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

const Registry = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <View>
                <StatusBar />
                <Header navigation={navigation} title='LỊCH SỬ ĐĂNG KIỂM'/>

                <ScrollView className=''>

        
                </ScrollView>

                <Pressable 
                    onPress={() => navigation.navigate('InputFuel')} 
                    className='bg-sub_bg_color py-2 px-10 my-8 mx-auto rounded-3xl' style='elevation: 5'
                >
                    <Text className='text-bg_color text-xl font-semibold mx-auto'>
                        Xác nhận
                    </Text>
                </Pressable>
            </View>
            <Footer navigation={navigation} id={2}/>
        </View>
    )
}

export default Registry