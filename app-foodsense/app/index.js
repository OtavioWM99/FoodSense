import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {Link} from 'expo-router';

export default function Root() {
    return(
        <View
        >
            <Text>    
                Expo Router
            </Text>
            <Link href={'/home'} style={{
                color: 'blue',
                textDecorationLine: 'underline',
            }}>Ir para Home</Link>
        </View>
    )
}