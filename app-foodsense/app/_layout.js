import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';


export default function RootLayout(){
    const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),

    });

    if (!fontsLoaded) return null;

    return (
        <Tabs
            screenOptions={{
                headerShown: false, 
            }}
        >
            <Tabs.Screen name='home' />
        </Tabs>
    )
}