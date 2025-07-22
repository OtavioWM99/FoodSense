import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../../src/components/ContinuarButton';
import VoltarButton from '../../src/components/VoltarButton';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
    // Adicionar validação / autenticação real aqui
    router.replace('/home');  // Navega para a aba Home, limpando o histórico de auth
    };

    const handleVoltar = () => {
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient
                colors={['#4ade80', '#14b8a6']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: moderateScale(20) }}
            >
                {/* Título */}
                <Text
                    style={{
                        fontSize: moderateScale(27),
                        fontFamily: 'Poppins-Bold',
                        marginBottom: verticalScale(30),
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                Entrar na sua conta
                </Text>
                
                <View>
                    {/* Input Email */}
                    <Text style={{ fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium' }}>Insira seu email</Text>
                    <TextInput style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(25), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular' }}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="email@dominio.com"
                        placeholderTextColor="#B5B5B5"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* Input Senha */}
                    <Text style={{ fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium' }}>Insira sua senha</Text>
                    <TextInput style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(25), fontFamily: 'Poppins-Regular', backgroundColor: 'white', borderRadius: moderateScale(8) }}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Senha"
                    placeholderTextColor="#B5B5B5"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    />

                </View>

                <View style={{ 
                        marginTop: verticalScale(40)
                    }}>

                    <ContinuarButton onPress={handleLogin} />
                    <VoltarButton onPress={handleVoltar} />

                </View>

            </LinearGradient>
         </SafeAreaView>
    )
}