import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {Link, useRouter} from 'expo-router';
import { Button, ButtonItens, ButtonMain } from '../src/components/Button/index.js';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Calendar } from '../src/components/Calendar.js'
import ReminderSection from '../src/components/ReminderSection.js';
import NotificationSection from '../src/components/NotificationSection.js';
import "../global.css"

export default function Home () {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    
    return (
        <View style={styles.container} className='bg-green-500'> 

            <View className='w-[70%] self-center mt-10'>
                <Calendar1 style={styles.calendar} className='flex-1 justify-start'/>
                <ReminderSection />
                <NotificationSection />
            </View>
        </View>
    )
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