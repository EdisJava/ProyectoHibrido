import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  const handleOrder = () => {
    console.log(`Nombre: ${name}, Opción 1: ${dropdown1}, Opción 2: ${dropdown2}`);
  };

  return (
    <View style={styles.screen}> {/* Usando el estilo de fondo */}
      <Image source={require("../../assets/images/rocketlogo.png")} style={styles.logo} /> {/* Añadido el logo */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Desplegable 1:</Text>
        <RNPickerSelect
          onValueChange={(value) => setDropdown1(value)}
          items={[
            { label: 'Opción 1', value: 'opcion1' },
            { label: 'Opción 2', value: 'opcion2' },
          ]}
          style={pickerStyles}
        />

        <Text style={styles.label}>Desplegable 2:</Text>
        <RNPickerSelect
          onValueChange={(value) => setDropdown2(value)}
          items={[
            { label: 'Opción A', value: 'opcionA' },
            { label: 'Opción B', value: 'opcionB' },
          ]}
          style={pickerStyles}
        />

        <View style={styles.buttonContainer}>
          <Button title="Pedir" onPress={handleOrder} />
        </View>
      </View>
    </View>
  );}

const pickerStyles = {
  inputIOS: {
    height: 55, // Incrementado para evitar cortes verticales
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 30, // Incrementado para evitar cortes horizontales
    color: '#333',
    fontSize: 10, // Reducido para adaptarse mejor
  },
  inputAndroid: {
    height: 55, // Incrementado para evitar cortes verticales
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 30, // Incrementado para evitar cortes horizontales
    color: '#333',
    fontSize: 10, // Reducido para adaptarse mejor
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffecb9',
    paddingVertical: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    flex: 1, // Permitir que el contenedor ocupe más espacio vertical
    justifyContent: 'space-evenly', // Distribuir los elementos uniformemente
    alignItems: 'center',
    paddingVertical: 20, // Añadir espacio interno
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  picker: {
    marginBottom: 20,
    width: '90%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
  },
});
