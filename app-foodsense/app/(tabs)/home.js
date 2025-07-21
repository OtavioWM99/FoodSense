import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {Link, useRouter} from 'expo-router';
import { Button, ButtonItens, ButtonMain } from '../../src/components/Button/index.js';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import "../../global.css"

export default function Home () {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    });
    
    return (
    <View>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Tela Home</Text>
    </View>
  );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        color: '#fff',
        fontFamily: 'Poppins-Italic'
    },
    calendar: {
        marginTop: 10,
    },
})