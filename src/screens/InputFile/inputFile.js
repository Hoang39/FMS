import { View, Image, Pressable, Text } from 'react-native'
import Header from "../../components/header/header"
import Footer from '../../components/footer/footer'

import avatar from '../../assets/images/avatar.png'
import style from '../../styles/style'

const InputFile = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <View>
                <Header navigation={navigation}/>

                <Image source={avatar} className='mx-auto my-8'></Image>
                <Pressable 
                    onPress={() => navigation.navigate('Registry')} 
                    className='bg-sub_bg_color py-3 mt-8 mx-auto rounded-3xl w-[70%]' style='elevation: 5'
                >
                    <Text className='text-bg_color text-2xl font-semibold mx-auto'>
                        Đăng kiểm
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.navigate('Toll')} 
                    className='bg-sub_bg_color py-3 mt-8 mx-auto rounded-3xl w-[70%]' style={style.shadow}
                >
                    <Text className='text-bg_color text-2xl font-semibold mx-auto'>
                        Phí đường bộ
                    </Text>
                </Pressable>
            </View>
            <Footer navigation={navigation} id={2}/>
        </View>
    )
}

export default InputFile