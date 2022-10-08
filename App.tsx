import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//...
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Toast from 'react-native-toast-message';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import ReportScreen from './screens/ReportScreen';
import CidadaoScreen from './screens/reports/CidadaoScreen';
import RegisterScreen from './screens/RegisterScreen';
import NascimentoScreen from './screens/reports/NascimentoScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen component={LoginScreen}     name="LoginScreen" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen component={UserScreen}      name="UserScreen" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen component={RegisterScreen}  name="RegisterScreen" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen component={ReportScreen}    name="ReportScreen" options={{headerShown: true, title: "Novo relatório"}}></Stack.Screen>

            <Stack.Screen component={NascimentoScreen}  name="NascimentoScreen" options={{headerShown: true, title: "Novo relatório - Nascimento"}}></Stack.Screen>

            <Stack.Screen component={CidadaoScreen}  name="CidadaoScreen" options={{headerShown: true, title: "Nova Denúncia"}}></Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>

        <Toast />
        <StatusBar />
        
      </SafeAreaProvider>
    );
  }
}
