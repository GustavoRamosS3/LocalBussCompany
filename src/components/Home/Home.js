// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import styles from './HomeStyle.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../../../assets/L_Azul.png'); // Atualize o caminho conforme necessário

const routeColors = {
  'Cohab/Santa Maria': 'Azul',
  'São Pedro': 'Verde',
  'Emilio Gardenal': 'Vermelha',
  'Povo Feliz': 'Roxo',
  'São Roque/Bonanza': 'Laranja'
};

export default function Home({ navigation, route, setUsuarioLogado, resetLoginState }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [routeName, setRouteName] = useState('');
  const [date, setDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [selectedRouteName, setSelectedRouteName] = useState('');

  const nomeUsuario = route.params?.nomeUsuario || 'Usuário'; // Obtém o nome do usuário logado

  // Função para sair e voltar para a tela de login
  const handleLogout = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Aqui especificamos a tela correta no navegador pai
    });
  };

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleStart = () => {
    if (!hasStarted) {
      setModalVisible(true);
    } else {
      setIsRunning(true);
      startLocationUpdates();
    }
  };

  const startTimer = (name) => {
    setRouteName(name);
    const now = new Date();
    setDate(format(now, 'dd-MM-yyyy HH:mm:ss'));
    const routeColor = routeColors[name] || 'Preto'; // Cor padrão
    setIsRunning(true);
    setHasStarted(true);
    setModalVisible(false);
    startLocationUpdates(routeColor); // Passa a cor para a função de início
  };

  const startLocationUpdates = async (color) => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation);
        setRoutePath((prevPath) => [
          ...prevPath,
          {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            color: color,
          },
        ]);
      }
    );
    setLocationSubscription(subscription);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setIntervalId(null);
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }

    saveRoute();
    setTimer(0);
    setHasStarted(false);
  };

  const saveRoute = async () => {
    if (routePath.length === 0) {
      console.error('No coordinates recorded. Path is empty.');
      return;
    }

    const routeId = Math.floor(Math.random() * 1000000); // Gera um número aleatório
    const color = routeColors[routeName] || 'Preto'; // Define uma cor padrão
    const routeData = {
      routeId: routeId,
      name: routeName,
      color: color,
      date: date,
      path: routePath,
      time: formatTime(timer),
    };

    try {
      const response = await fetch('https://parseapi.back4app.com/classes/Rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': 'QlUVf0spu3gUQPMifr8zOVmG3LCbYmsGiSdd62rI',
          'X-Parse-REST-API-Key': 'xiUvBsGSYVF0H7iDSYum9MXekIatgY7xh8ghQu3N',
        },
        body: JSON.stringify(routeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${response.statusText}: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Route saved successfully:', data);
      setRoutePath([]);
    } catch (error) {
      console.error('Error saving route:', error.message || error);
    }
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.timer}>{formatTime(timer)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveRoute}>
        <Text style={styles.buttonText}>Gravar Nova Rota</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarRotas')}>
        <Text style={styles.buttonText}>Listar Rotas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Escolha o Nome da Rota</Text>
            <Picker
              selectedValue={selectedRouteName}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedRouteName(itemValue)}
            >
              <Picker.Item label="Cohab/Santa Maria" value="Cohab/Santa Maria" />
              <Picker.Item label="São Pedro" value="São Pedro" />
              <Picker.Item label="Emilio Gardenal" value="Emilio Gardenal" />
              <Picker.Item label="Povo Feliz" value="Povo Feliz" />
              <Picker.Item label="São Roque/Bonanza" value="São Roque/Bonanza" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => startTimer(selectedRouteName)}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


