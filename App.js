import { useState, useEffect } from "react";
import { View, Text, LogBox } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignIn from './src/screens/SignIn/signIn'
import InputFuel from './src/screens/InputFuel/inputFuel'
import FormFuel from './src/screens/InputFuel/formFuel'
import InputFile from './src/screens/InputFile/inputFile'
import Registry from "./src/screens/Registry/registry";
import Toll from "./src/screens/Toll/toll";
import HistoryFuel from "./src/screens/InputFuel/historyFuel";
import DetailFuel from "./src/screens/InputFuel/detailFuel";
import FormRegistry from "./src/screens/Registry/formRegistry";
import FormToll from "./src/screens/Toll/formToll";
import Profile from "./src/screens/Profile/profile";
import Contact from "./src/screens/Contact/contact";
import Feedback from "./src/screens/Feedback/feedback";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`','Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead']);

  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await AsyncStorage.getItem('token')
      if (typeof res === 'string')
        setIsLoggedIn(true)
      setIsLoading(false)
    })()
  },[])

  const handleLogout = async () => {
    console.log('token logout');
    await AsyncStorage.removeItem('token')
    Alert.alert('Thông báo', 'Hết thời gian sử dụng tài khoản')
    // navigation.navigate('SignIn') 
  }
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'InputFuel' : 'SignIn'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Feedback" component={Feedback} />

          <Stack.Screen name="InputFuel" component={InputFuel} />
          <Stack.Screen name="FormFuel" component={FormFuel} />
          <Stack.Screen name="HistoryFuel" component={HistoryFuel} />
          <Stack.Screen name="DetailFuel" component={DetailFuel} />

          <Stack.Screen name="InputFile" component={InputFile} />

          <Stack.Screen name="Registry" component={Registry} />
          <Stack.Screen name="FormRegistry" component={FormRegistry} />

          <Stack.Screen name="Toll" component={Toll} />
          <Stack.Screen name="FormToll" component={FormToll} />

        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}