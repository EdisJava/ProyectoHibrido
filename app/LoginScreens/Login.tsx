import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConf';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        if (!email || !password) {
            alert('Por favor completa email y contraseña');
            return;
        }
        
        if (!auth) {
            alert('Error: Firebase no está disponible');
            return;
        }

        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Inicio de sesión correcto');
            router.replace("/(tabs)");
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.message || 'Error al iniciar sesión';
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        if (!email || !password) {
            alert('Por favor completa email y contraseña');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!auth) {
            alert('Error: Firebase no está disponible');
            return;
        }

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Registro correcto');
            router.replace("/(tabs)");
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.message || 'Error al registrar';
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput 
                    value={email} 
                    style={styles.input} 
                    placeholder='Email' 
                    autoCapitalize='none'
                    editable={!loading}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    value={password} 
                    style={styles.input} 
                    placeholder='Contraseña' 
                    autoCapitalize='none'
                    editable={!loading}
                    onChangeText={(text) => setPassword(text)}
                />
                {loading ? 
                    <ActivityIndicator size="large" color="#0000ff" /> 
                : (
                    <>
                        <Button title='Login' onPress={signIn} />
                        <Button title='Register' onPress={signUp} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#ffecb9',
        marginBottom: 10
    }
});



