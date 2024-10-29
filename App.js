import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importar o Tab
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../LocalBussCompany/src/components/Home/Home.js';
import ListarRotas from '../LocalBussCompany/src/components/ListarRotas/ListarRotas.js';
import TrackingScreen from '../LocalBussCompany/src/components/Tracking/TrackingScreen.js';
import LoginScreen from '../LocalBussCompany/src/components/LoginScreen/LoginScreen.js';
import WelcomeScreen from '../LocalBussCompany/src/components/WelcomeScreen/WelcomeScreen.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de ter a biblioteca instalada

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Criar o Tab Navigator

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Gravar Rota"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Gravar Rota':
            iconName = 'home';
            break;
          case 'ListarRotas':
            iconName = 'list';
            break;
          case 'Rastreamento':
            iconName = 'location-on';
            break;
          default:
            iconName = 'home';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Rastreamento" component={TrackingScreen} />
    <Tab.Screen name="Gravar Rota" component={Home} />
    <Tab.Screen name="ListarRotas" component={ListarRotas} />
  </Tab.Navigator>
);

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('usuarioLogado');
      if (storedUser) {
        setUsuarioLogado(JSON.parse(storedUser)); // Recupera o usuário do AsyncStorage
      }
    };

    checkLoginStatus();
  }, []);

  const resetLoginState = () => {
    console.log('Resetando o estado de login...');
  };

  const handleLogin = async (usuario) => {
    setUsuarioLogado(usuario);
    await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazena o usuário
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => (
            <LoginScreen
              {...props}
              setUsuarioLogado={handleLogin}
              resetLoginState={resetLoginState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
          {props => (
            <WelcomeScreen
              {...props}
              usuarioLogado={usuarioLogado}
              setUsuarioLogado={setUsuarioLogado}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => (
            <MainTabs />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
