import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade

export default function WelcomeScreen() {
    return(
        <LinearGradient
            colors={['#4ade80', '#14b8a6']}
            className="flex-1 justify-center items-center px-8"
        >
         {/* Título */}
         <Text className="font-poppinsBold text-white text-center"
         style={{
            fontSize: moderateScale(30),
            marginBottom: verticalScale(20)
         }}
         >
            Entre no FoodSense
         </Text>
        {/* Bloco - Já tem conta */}
        <View className="items-center">
            <Text className="text-white font-poppinsSemiBold"  style={{
                    fontSize: moderateScale(20),
                }}>Já tem uma conta? 
            </Text>
             <TouchableOpacity
                onPress={() => router.push('/(auth)/login')}
                className="justify-center items-center rounded-full"
                activeOpacity={0.7}
                style={{
                    backgroundColor: "#949494",
                    padding: moderateScale(8),
                    width: scale(200),
                    marginTop: moderateScale(4)
                }}
            >
                <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(16) }}>Entrar</Text>
            </TouchableOpacity>
        </View>

        {/* Bloco - Novo usuário */}
          <View className="items-center" style={{ marginTop: verticalScale(25) }}>
               <Text className="text-white font-poppinsSemiBold"  style={{
                        fontSize: moderateScale(20),
                    }}>É usuário novo? 
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/cadastro')}
                    className="justify-center items-center rounded-full"
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: "#949494",
                        padding: moderateScale(8),
                        width: scale(200),
                        marginTop: moderateScale(4)
                    }}
                >
                    <Text className="text-white font-poppinsMedium" style={{ fontSize: moderateScale(16) }}>Crie sua conta</Text>
                </TouchableOpacity> 
          </View>      

        </LinearGradient>
    );

}