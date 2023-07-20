import { useState } from 'react'
import { Pressable, View, Text, StatusBar, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, Row } from 'react-native-table-component';

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import style from '../../styles/style'
import { SafeAreaView } from 'react-native';

const Contact = ({ navigation }) => {
    return (
        <View className='bg-bg_color h-full flex justify-between'>
            <SafeAreaView className='flex justify-between mb-4'>
                <StatusBar />
                <Header navigation={navigation} title='LIÊN HỆ'/>


            </SafeAreaView>

            <Footer navigation={navigation} id={0}/>
        </View>
    )
}

export default Contact;