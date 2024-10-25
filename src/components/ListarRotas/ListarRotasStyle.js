import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    routeItem: {
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    point: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    routeInfo: {
      flex: 1,
    },
    routeText: {
      fontSize: 16,
      marginBottom: 5,
    },
    deleteButton: {
      padding: 10,
    },
  });
  
  export default styles;