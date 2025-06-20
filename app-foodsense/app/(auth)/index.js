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
            <Text className="text-white font-poppinsMedium"  style={{
                    fontSize: moderateScale(20),
                }}>Já tem uma conta? 
            </Text>
             <TouchableOpacity
                onPress={() => router.push('/(auth)/login')}
                className="justify-center items-center rounded-full"
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
               <Text className="text-white font-poppinsMedium"  style={{
                        fontSize: moderateScale(20),
                    }}>É usuário novo? 
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/cadastro')}
                    className="justify-center items-center rounded-full"
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

        {/* Separador */}
           <Text className="text-white font-poppinsRegular" style={{ fontSize: moderateScale(16), marginTop: verticalScale(25) }}>ou continue com</Text> 

        {/* Botões sociais */}           
        <View className="flex-row flex-wrap justify-center">
            {/* Botão Google */}
            <TouchableOpacity className="bg-white flex-row flex-wrap items-center justify-center rounded-full" 
            style={{
                padding: moderateScale(8),
                width: scale(200),
                marginTop: moderateScale(8)
            }}
            >
                <Ionicons name="logo-google" style={{ fontSize: moderateScale(18) }} color="black" />
                <Text className="font-poppinsMedium ml-2 pt-1" style={{ fontSize: moderateScale(15) }}>Google</Text>
            </TouchableOpacity>

            {/* Botão Facebook */}
            <TouchableOpacity className="bg-white flex-row items-center justify-center rounded-full"
            style={{
                padding: moderateScale(8),
                width: scale(200),
                marginTop: moderateScale(12)
            }}
            >
                <Ionicons name="logo-facebook" style={{ fontSize: moderateScale(20) }} color="black" />
                <Text className="font-poppinsMedium ml-2 mt-1" style={{ fontSize: moderateScale(15) }}>Facebook</Text>
            </TouchableOpacity> 
        </View>  

        </LinearGradient>
    );

}