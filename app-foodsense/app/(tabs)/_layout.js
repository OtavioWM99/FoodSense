import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Header from '../../src/components/Header';
import { Ionicons } from '@expo/vector-icons';


export default function RootLayout(){
    const [fontsLoaded] = useFonts({
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    header: () => <Header />,
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray', // Cor para ícones inativos
                    tabBarStyle: { backgroundColor: 'white' }, // Fundo branco para a barra de abas
                }}
            >
                <Tabs.Screen 
                    name='home' 
                    options={{
                        title: 'Início',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name='cardapio' 
                    options={{
                        title: 'Cardápio',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="restaurant-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name='receitas' 
                    options={{
                        title: 'Receitas',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="book-outline" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    )
}