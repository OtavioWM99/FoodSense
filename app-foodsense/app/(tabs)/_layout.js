import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Header from '../../src/components/Header';


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
                    header: () => <Header />,
                }}
            >
                <Tabs.Screen name='home' />
                <Tabs.Screen name='cardapio' />
                <Tabs.Screen name='receitas' />
            </Tabs>
        </SafeAreaProvider>
    )
}