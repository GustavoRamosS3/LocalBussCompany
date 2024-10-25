import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff', // Fundo branco
    padding: 20,
  },
   
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue', // Preto
    textAlign: 'center',
    marginBottom: 20,
    top: -80,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0842a0ff', 
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF', // Fundo branco para campo de senha
    top: -30,
  },

  input: {
    height: 40,
    borderColor: '#0842a0ff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    top: -30,
  },

  inputSenha: {
    flex: 1, // Ocupa todo o espaço disponível
    height: 40,
    color: '#000', // Cor do texto preto
  }, 
  
  logo: {  
    width: 180, // Ajuste conforme o tamanho da sua imagem
    height: 180, // Ajuste conforme o tamanho da sua imagem
    marginTop: -100,
    marginBottom: 20, // Espaço entre a imagem e o texto
    left: 100,
    borderRadius: 20,
  },

  button: {
    backgroundColor: 'rgb(61, 106, 255)', // Cor de fundo do botão
    borderColor: 'rgb(61, 106, 255)',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  label: {
    color: '#0842a0ff',
    marginBottom: 5,
    top: -30,
    textTransform: 'uppercase',
  },
});

export default styles;
