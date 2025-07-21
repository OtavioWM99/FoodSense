import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const shadowStyle = {
        // iOS
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      
        // Android
        elevation: 6,
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient
                colors={['#4ade80', '#14b8a6']}
                className="flex-1 justify-center items-center px-8"
            >
                {/* Título */}
                <Text className="font-poppinsBold text-white text-center"
                    style={{
                        fontSize: moderateScale(27),
                        marginBottom: verticalScale(30)
                    }}
                >
                Entrar na sua conta
                </Text>
                
                <View>
                    {/* Input Email */}
                    <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(18), marginBottom: verticalScale(2) }}>Insira seu email</Text>
                    <TextInput style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(25) }}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="email@dominio.com"
                        placeholderTextColor="#B5B5B5"
                        className="bg-white rounded-lg font-poppinsRegular"
                    />

                    {/* Input Senha */}
                    <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(18), marginBottom: verticalScale(2) }}>Insira sua senha</Text>
                    <TextInput style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(25) }}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Senha"
                    placeholderTextColor="#B5B5B5"
                    secureTextEntry
                    className="bg-white rounded-lg font-poppinsRegular"
                    />

                </View>

                <View style={{ 
                        marginTop: verticalScale(40)
                    }}>

                    {/* Botão Continuar */}
                    <TouchableOpacity style={{ width: scale(250), height: moderateScale(40), backgroundColor: "#949494", marginBottom: verticalScale(12), ...shadowStyle }}
                        onPress={handleLogin}
                        className="rounded-full items-center justify-center"
                        activeOpacity={0.7}
                    >
                    <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(14) }}>Continuar</Text>
                    </TouchableOpacity>

                    {/* Botão Voltar */}
                    <TouchableOpacity style={{ width: scale(250), height: moderateScale(40), backgroundColor: "#C2C2C2", ...shadowStyle }}
                        onPress={handleVoltar}
                        className="rounded-full items-center justify-center"
                        activeOpacity={0.7}
                    >
                    <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(14) }}>Voltar</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
         </SafeAreaView>
    )
}