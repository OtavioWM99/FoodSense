import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Stack } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade


export default function CardapioScreen() {

  const { width, height } = Dimensions.get('window');
  const [fontsLoaded] = useFonts({
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
  });


  return (
   

    <LinearGradient 
        colors={['#4ade80', '#14b8a6']}
        className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 1 }}>

        {/* Cabeçalho */}
        <View className="pt-safe-offset-3 bg-white flex-row justify-end pr-6">
          <TouchableOpacity className="items-center">
            <Ionicons name="person-sharp" color="black" style={{ fontSize: moderateScale(30) }} />
            <Text style={{ fontSize: moderateScale(10) }} className="font-poppinsMedium">Meu perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={{ 
            fontSize: moderateScale(20),
            marginTop: verticalScale(40),
          }} className="font-poppinsBold text-center text-white">
          Encontre opções para suas refeições diárias
        </Text>

        <Text className="font-poppinsSemiBold text-center text-white"
          style = {{ 
            fontSize: moderateScale(18.5),
            marginTop: verticalScale(25),
          }}>
          Seu cardápio personalizado
        </Text>

        {/* Grade de botões */}
        <View className="flex-row flex-wrap justify-evenly">
          {[
            { label: 'Café da manhã', icon: 'cafe-outline' },
            { label: 'Almoço', icon: 'restaurant-outline' },
            { label: 'Lanches', icon: 'fast-food-outline' },
            { label: 'Janta', icon: 'wine-outline' },
          ].map((item, index) => (
            <TouchableOpacity style={{
                backgroundColor: '#D9D9D9',
                width: scale(140),
                height: verticalScale(120),
                marginTop: moderateScale(20)
              }}
              key={index}
              className="rounded-3xl justify-center items-center shadow"
            >
              <Ionicons name={item.icon} color="#000" style={{ fontSize: moderateScale(50) }} />
              <Text className="font-poppinsMedium" style={{ 
                  fontSize: moderateScale(14),
                  marginTop: moderateScale(5)
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão Personalizar */}
        <TouchableOpacity className="rounded-2xl flex-row items-center justify-center shadow" style={{
            backgroundColor:'#D9D9D9',
            padding: moderateScale(10),
            marginTop: verticalScale(35),
            marginLeft: scale (25),
            width: scale(300)
          }}>
          <Ionicons name="create-outline" style={{ fontSize:  moderateScale(25) }} color="black" />
          <Text className="ml-2 font-poppinsMedium" style={{ fontSize:  moderateScale(14) }}>Personalizar refeições</Text>
        </TouchableOpacity>

        {/* Botão Mudar preferências */}
        <TouchableOpacity className="rounded-2xl flex-row items-center justify-center shadow" 
          style={{
            backgroundColor:'#D9D9D9',
            padding: moderateScale(10),
            marginTop: verticalScale(15),
            marginLeft: scale (25),
            width: scale(300)
          }}> 
          <Ionicons name="person-outline" style={{ fontSize:  moderateScale(23) }} color="black" />
          <Text className="ml-2 font-poppinsMedium" style={{ fontSize:  moderateScale(12) }}>
            Mudar intolerâncias ou preferências
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navegação inferior */}
      <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-200">
        {[
          { icon: 'home-outline', label: 'Home' },
          { icon: 'restaurant-outline', label: 'Cardápio' },
          { icon: 'book-outline', label: 'Receitas' },
          { icon: 'newspaper-outline', label: 'Notícias' },
        ].map((item, index) => (
          <TouchableOpacity key={index} className="items-center">
            <Ionicons name={item.icon} size={24} color="black" />
            <Text className="text-xs">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}