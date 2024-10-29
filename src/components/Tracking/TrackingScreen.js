//TrackingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import styles from './TrackingScreenStyle.js'
import { Picker } from '@react-native-picker/picker';

const ROUTE_API_URL = 'https://parseapi.back4app.com/classes/LocAtual';
const APP_ID = 'QlUVf0spu3gUQPMifr8zOVmG3LCbYmsGiSdd62rI';
const REST_API_KEY = 'xiUvBsGSYVF0H7iDSYum9MXekIatgY7xh8ghQu3N';

const logo = require('../../../assets/L_Azul.png'); 

const routes = {
  'point Cohab/Santa Maria': {
    name: 'point Cohab/Santa Maria',
    iconPath: require('../../../assets/iconRotas/iconCohab.png')
  },
  'point São Pedro': {
    name: 'point São Pedro',
    iconPath: require('../../../assets/iconRotas/iconPedro.png')
  },
  'point Emilio Gardenal': {
    name: 'point Emilio Gardenal',
    iconPath: require('../../../assets/iconRotas/iconEmilio.png')
  },
  'point Povo Feliz': {
    name: 'point Povo Feliz',
    iconPath: require('../../../assets/iconRotas/iconPovo.png')
  },
  'point São Roque/Bonanza': {
    name: 'point São Roque/Bonanza',
    iconPath: require('../../../assets/iconRotas/iconRoque.png')
  }
};

export default function TrackingScreen() {
  const [buttonActive, setButtonActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedRouteName, setSelectedRouteName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeId, setRouteId] = useState(null);

  useEffect(() => {
    if (buttonActive) {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada para acessar a localização.');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        sendLocationUpdate(location.coords);
      };

      getLocation();

      const intervalId = setInterval(getLocation, 3000);

      return () => clearInterval(intervalId);
    }
  }, [buttonActive]);

  useEffect(() => {
    if (selectedRouteName) {
      checkRouteInDatabase();
    }
  }, [selectedRouteName]);

  const checkRouteInDatabase = async () => {
    try {
      const route = routes[selectedRouteName];

      const response = await fetch(`${ROUTE_API_URL}?where={"name":"${route.name}"}`, {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id': APP_ID,
          'X-Parse-REST-API-Key': REST_API_KEY
        }
      });

      const data = await response.json();
      const routeExists = data.results && data.results.length > 0;

      if (routeExists) {
        console.log('off');
        const existingRouteId = data.results[0].objectId;
        setRouteId(existingRouteId);
      } else {
        const routeId = new Date().getTime(); 
        const currentDate = new Date().toISOString();

        const createResponse = await fetch(ROUTE_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': APP_ID,
            'X-Parse-REST-API-Key': REST_API_KEY
          },
          body: JSON.stringify({
            routeId: routeId,
            path: [],
            name: route.name,
            date: currentDate
          })
        });

        const newRouteData = await createResponse.json();

        if (createResponse.ok) {
          console.log('ok');
          setRouteId(newRouteData.objectId);
        } else {
          console.error('Erro ao criar nova rota:', newRouteData);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar ou criar rota:', error.message || error);
    }
  };

  const sendLocationUpdate = async (coords) => {
    if (!selectedRouteName) {
      console.log('Aguardando seleção de rota...');
      return;
    }

    if (!routeId) return; 

    try {
      const currentDate = new Date().toISOString(); 

      await fetch(`${ROUTE_API_URL}/${routeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': APP_ID,
          'X-Parse-REST-API-Key': REST_API_KEY
        },
        body: JSON.stringify({
          path: [coords],
          name: routes[selectedRouteName].name,
          date: currentDate
        })
      });

      console.log('Coordenada atualizada para a rota:', selectedRouteName);
    } catch (error) {
      console.error('Erro ao enviar atualização de localização:', error.message || error);
    }
  };

  const toggleTracking = () => {
    if (buttonActive) {
      setButtonActive(false);
      setSelectedRouteName('');
      setRouteId(null);
      console.log('Parando o envio de coordenadas.');
    } else {
      setModalVisible(true);
    }
  };

  const startTracking = () => {
    if (selectedRouteName) {
      setButtonActive(true);
      setModalVisible(false);
      console.log(`Iniciando envio para a rota: ${selectedRouteName}`);
    } else {
      console.log('Nenhuma rota selecionada.');
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.roundButton, { backgroundColor: buttonActive ? 'red' : 'green' }]}
          onPress={toggleTracking}
        >
          <Text style={styles.buttonText}>{buttonActive ? 'Desligar' : 'Ligar'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Escolha a Rota para o Seu Trajeto</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedRouteName}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedRouteName(itemValue)}
              >
                {!selectedRouteName && (
                  <Picker.Item label="Clique aqui" value="" />
                )}
                {Object.keys(routes).map((routeName) => (
                  <Picker.Item
                    key={routeName}
                    label={routeName}
                    value={routeName}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={startTracking}
            >
              <Text style={styles.modalButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
