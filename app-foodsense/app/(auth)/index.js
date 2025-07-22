import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { SafeAreaView } from 'react-native-safe-area-context';
import { shadowStyle } from '../../src/components/Shadow';

export default function WelcomeScreen() {

    return(
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient
                colors={['#4ade80', '#14b8a6']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: moderateScale(20) }}
            >
             {/* Título */}
             <Text
             style={{
                fontSize: moderateScale(28),
                marginTop: verticalScale(-20),
                marginBottom: verticalScale(40),
                fontFamily: 'Poppins-Bold',
                color: 'white',
                textAlign: 'center',
             }}
             >
                Entre no FoodSense
             </Text>
            {/* Bloco - Já tem conta */}
            <View style={{ alignItems: 'center'}}>
                <Text   style={{
                        fontSize: moderateScale(20),
                        fontFamily: 'Poppins-SemiBold',
                        color: 'white',
                    }}>Já tem uma conta? 
                </Text>
                 <TouchableOpacity
                    onPress={() => router.push('/(auth)/login')}
                    activeOpacity={0.7}
                    style={[
                        shadowStyle.shadow,
                        {
                        backgroundColor: "#949494",
                        padding: moderateScale(8),
                        width: scale(200),
                        marginTop: moderateScale(4),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(24),
                        }
                    ]}
                >
                    <Text style={{ fontSize: moderateScale(16), color: 'white', fontFamily: 'Poppins-Medium' }}>Entrar</Text>
                </TouchableOpacity>
            </View>

            {/* Bloco - Novo usuário */}
              <View style={{ marginTop: verticalScale(25), alignItems: 'center' }}>
                   <Text style={{
                            fontSize: moderateScale(20),
                            fontFamily: 'Poppins-SemiBold',
                            color: 'white',
                        }}>É usuário novo? 
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/cadastro')}
                        activeOpacity={0.7}
                        style={[
                            shadowStyle.shadow, 
                            {
                            backgroundColor: "#949494",
                            padding: moderateScale(8),
                            width: scale(200),
                            marginTop: moderateScale(4),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: moderateScale(24),
                            }
                        ]}
                    >
                        <Text style={{ fontSize: moderateScale(16), fontFamily: 'Poppins-Medium', color: 'white' }}>Crie sua conta</Text>
                    </TouchableOpacity> 
              </View>      

            </LinearGradient>
        </SafeAreaView>
    );

}