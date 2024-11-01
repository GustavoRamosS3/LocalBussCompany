import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: { 
    width: 225,
    height: 225,
    borderRadius: 125,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 200,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: 200,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
