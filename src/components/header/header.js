import { useState, useEffect, useCallback } from 'react'
import { Pressable, View, Text, Animated,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import SideMenu from '../sideMenu/sideMenu';
import { useFocusEffect } from '@react-navigation/native';

const Header = ({navigation, title}) => {
    const [menuSideState, setMenuSideState] = useState(false)
    const [sideAnimation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(sideAnimation, {
          toValue: menuSideState ? 1 : 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
    }, [menuSideState]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setMenuSideState(false);
            };
        }, [])
    );

    const translateX = sideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0],
    })

    if (title) 
        return (
            <View className='px-8 bg-white'>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    className='flex flex-row items-center space-x-6 py-3'
                >
                    <Icon name='angle-left' size={30} color='#259EE2'></Icon>
                    <Text className='text-bg_color text-xl font-medium'>{title}</Text>
                </Pressable>
            </View>
        )
    else
        return (
            <>
                <View className='mx-12 mt-4 flex flex-row justify-between items-center'>
                    <Pressable onPress={() => setMenuSideState(!menuSideState)}>
                        <Icon name="bars" size={24}></Icon>
                    </Pressable>
                    <Pressable>
                        <Icon name="bell" size={24}></Icon>
                    </Pressable>
                </View>   
                {
                    menuSideState 
                    && 
                    <Animated.View 
                        className='absolute h-screen w-full'  
                        style={{ zIndex: 100, transform: [{ translateX }] }}
                    >
                        <SideMenu navigation={navigation}/>
                        <TouchableWithoutFeedback onPress={() => setMenuSideState(!menuSideState)}> 
                            <View className='h-screen absolute right-0 top-0 w-2/5'></View>
                        </TouchableWithoutFeedback>
                    </Animated.View> 
                }
            </>
        )
}

export default Header