import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';


export default function RootLayout(){
    const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),   
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: false, 
                }}
            >
                <Tabs.Screen name='home' />
            </Tabs>
        </SafeAreaProvider>
    )
}