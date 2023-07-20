import { SafeAreaView } from 'react-native';
import { Pressable, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const tab = [
    {
        name:'Nhập dầu',
        id: 1,
        to: 'InputFuel',
        icon: 'gas-pump'
    },
    {
        name:'Nhập hồ sơ',
        id: 2,
        to: 'InputFile',
        icon: 'file-export'
    },
    {
        name:'Chuyến',
        id: 3,
        to: '#',
        icon: 'road'
    }
]

const Footer = ({navigation, id}) => {
    return (
        <SafeAreaView className='flex flex-row justify-around items-center bg-[#CECECE] py-1'>
        {
            tab.map((item) => (
                <Pressable 
                    onPress={() => navigation.navigate(item.to)}
                    key={item.id} 
                    className='flex items-center'
                >
                    <View className='p-3 bg-white rounded-full'>
                        <Icon name={item.icon} size={24} color={item.id == id? '#3C22D9':'black'}></Icon>
                    </View>
                    <Text className={'font-medium ' + (item.id == id? 'text-btn_color':'')}>{item.name}</Text>
                </Pressable> 
            ))
        }
        </SafeAreaView>
    )
}

export default Footer