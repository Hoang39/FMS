import { Pressable, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({navigation, title}) => {
    return (
        <View>
        {
            title
            ?
            <View className='px-8 bg-white'>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    className='flex flex-row items-center space-x-6 py-3'
                >
                    <Icon name='angle-left' size={30} color='#259EE2'></Icon>
                    <Text className='text-bg_color text-xl font-medium'>{title}</Text>
                </Pressable>
            </View>
            :
            <View className='mx-12 mt-4 flex flex-row justify-between items-center'>
                <Pressable>
                    <Icon name="bars" size={24}></Icon>
                </Pressable>
                <Pressable>
                    <Icon name="bell" size={24}></Icon>
                </Pressable>
            </View>   
        }
        </View>
    )
}

export default Header