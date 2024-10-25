// LoginScreen.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import styles from './LoginScreenStyle.js';
import credenciais from '../../data/credenciais.js'; // Importe as credenciais

const LoginScreen = ({ setUsuarioLogado, navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false); // Controle da visibilidade da senha
  const logo = require('../../../assets/L_Azul.png');

  // Função de validação de credenciais
  const validarLogin = () => {
    const usuario = credenciais.find(
      (user) => user.email === email && user.senha === senha
    );
    if (usuario) {
      setUsuarioLogado(usuario); // Define o usuário logado
      navigation.navigate('Welcome'); // Navega para a tela de boas-vindas
    } else {
      Alert.alert('Erro', 'Seu email ou sua senha estão errados, verifique-os.');
      // Limpa os campos de email e senha
      setEmail('');
      setSenha('');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Digite seu email"
        placeholderTextColor="#D3D3D3" // Cor do placeholder
      />

      <Text style={styles.label}>Senha:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputSenha}
          onChangeText={(text) => setSenha(text)}
          value={senha}
          secureTextEntry={!senhaVisivel} // Quando 'false', a senha fica escondida.
          autoCapitalize="none"
          placeholder="Digite sua senha"
          placeholderTextColor="#D3D3D3" // Cor do placeholder
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <Ionicons name={senhaVisivel ? 'eye' : 'eye-off'} size={24} color="#3d6aff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={validarLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
