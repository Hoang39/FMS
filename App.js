import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import SignIn from './src/screens/SignIn/signIn'
import InputFuel from './src/screens/InputFuel/inputFuel'
import FormFuel from './src/screens/InputFuel/formFuel'
import InputFile from './src/screens/InputFile/inputFile'
import Registry from "./src/screens/Registry/registry";
import Toll from "./src/screens/Toll/toll";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="InputFuel" component={InputFuel} />
          <Stack.Screen name="FormFuel" component={FormFuel} />
          <Stack.Screen name="InputFile" component={InputFile} />
          <Stack.Screen name="Registry" component={Registry} />
          <Stack.Screen name="Toll" component={Toll} />

        </Stack.Navigator>

      </NavigationContainer>
    </ActionSheetProvider>
  );
}