import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    welcomeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4', // Fundo suave e neutro
      padding: 20,
      paddingTop: 60, // Adiciona espaço no topo
    },
    welcomeText: {
      color: '#333', // Texto escuro para melhor legibilidade
      fontSize: 20,
      fontWeight: '600', // Fonte semi-negrito
      marginVertical: 10, // Margem vertical entre textos
      textAlign: 'center', // Centraliza o texto
    },
    userImage: {
      width: 120,  // Ajuste conforme necessário
      height: 120, // Ajuste conforme necessário
      borderRadius: 60, // Faz a imagem ser redonda
      marginBottom: 30, // Espaço abaixo da imagem
      borderWidth: 2, // Borda sutil para a imagem
      borderColor: '#0056b3', // Cor da borda
    },
    buttonContainer: {
      width: '45%', // Botões ocupam 80% da largura
    },
    button: {
      backgroundColor: '#0056b3', // Cor de fundo do botão
      borderRadius: 30, // Bordas arredondadas
      paddingVertical: 15, // Espaçamento vertical interno
      alignItems: 'center', // Centraliza o texto dentro do botão
      marginBottom: 10, // Espaço entre os botões
      shadowColor: '#000', // Cor da sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2, // Opacidade da sombra
      shadowRadius: 4, // Raio da sombra
      elevation: 5, // Elevação para Android
    },
    buttonLogout: {
      backgroundColor: '#e74c3c', // Cor de fundo do botão "Trocar de Usuário"
    },
    buttonText: {
      color: '#fff', // Cor do texto do botão
      fontSize: 15, // Tamanho da fonte do botão
      fontWeight: 'bold', // Texto em negrito
    },
    buttonSpacing: {
      height: 10, // Altura do espaço entre os botões
    },
  });
  
export default styles;