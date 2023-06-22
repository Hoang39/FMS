import { View, Image, Pressable, Text, StatusBar } from 'react-native'
import Header from "../../components/header/header"
import Footer from '../../components/footer/footer'

import avatar from '../../assets/images/avatar.png'
import style from '../../styles/style'

const InputFuel = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <View>
                <StatusBar />
                <Header navigation={navigation}/>

                <Image source={avatar} className='mx-auto my-8'></Image>
                <Pressable 
                    onPress={() => navigation.navigate('FormFuel')} 
                    className='bg-sub_bg_color py-3 px-16 my-8 mx-auto rounded-3xl' style={style.shadow}
                >
                    <Text className='text-bg_color text-2xl font-semibold mx-auto'>
                        Nạp/xả nhiên liệu
                    </Text>
                </Pressable>
            </View>
            <Footer navigation={navigation} id={1}/>
        </View>
    )
}

export default InputFuel