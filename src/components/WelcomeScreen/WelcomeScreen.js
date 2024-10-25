// WelcomeScreen.js
import React from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import styles from './WelcomeScreenStyle.js'

const WelcomeScreen = ({ usuarioLogado, navigation, setUsuarioLogado }) => {
  // Verifica se usuarioLogado é nulo
  if (!usuarioLogado) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Carregando...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    setUsuarioLogado(null); // Limpa o estado do usuário logado

    // Redireciona para a tela de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Direciona para a tela de login
    });
  };

  return (
    <View style={styles.welcomeContainer}>
      <Image source={usuarioLogado.imagem} style={styles.userImage} />
      <Text style={styles.welcomeText}>Bem-vindo, {usuarioLogado.nome}!</Text>
      <Text style={styles.welcomeText}>Email: {usuarioLogado.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Home')} // Navega para a tela inicial
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacing} />
        <TouchableOpacity 
          style={[styles.button, styles.buttonLogout]} 
          onPress={handleLogout} // Logout e redireciona para a tela de login
        >
          <Text style={styles.buttonText}>Trocar De Usuário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
