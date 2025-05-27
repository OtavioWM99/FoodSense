import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {Link} from 'expo-router';
import { useState, useEffect } from 'react';

//exemplo de puxar dados do usuário do banco de dados
const USERS = [
    {
        id: 1,
        name: 'Otávio WM'
    },
    {
     id: 2,
     name: 'Pietro Hoffmann'
    },
]

export default function Profile () {
    const [name, setName] = useState('');
    const params = useLocalSearchParams();

    useEffect(() => {
        setName(USERS.filter((v, i) => v.id == Number(params.id))[0] ?.name); 
    },[])

    return (
        <View style={styles.container}>
            <Text style={{
                color: '#fff',
            }}>
                Tela de Perfil
            </Text>
              <Text style={{
                color: '#fff',
                marginTop: 10,
            }}>
                Pefil: {name ? name : 'Sem nome'}
            </Text>
            <Link href={'/'} style={{
                color: 'blue',
                textDecorationLine: 'underline',
            }}>Ir para Index</Link>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
})