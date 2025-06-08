import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Stack } from 'expo-router';

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
        <View className="pt-safe-offset-1 bg-white flex-row justify-end pr-6">
          <TouchableOpacity className="items-center">
            <Ionicons name="person-circle-outline" color="black" style={{ fontSize: RFValue(30) }} />
            <Text style={{ fontSize: RFValue(10) }} className="font-poppinsMedium">Meu perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={{ fontSize: RFValue(20) }} className="font-poppinsBold text-center text-white mt-10 mb-2">
          Encontre opções para suas refeições diárias
        </Text>

        <Text className="font-poppinsBold text-center text-white mt-10 mb-4"
          style = {{ fontSize: RFValue(20) }}
        >
          Seu cardápio personalizado
        </Text>

        {/* Grade de botões */}
        <View className="flex-row flex-wrap justify-between gap-6 mt-4 bg-slate-600">
          {[
            { label: 'Café da manhã', icon: 'cafe-outline' },
            { label: 'Almoço', icon: 'restaurant-outline' },
            { label: 'Lanches', icon: 'fast-food-outline' },
            { label: 'Janta', icon: 'wine-outline' },
          ].map((item, index) => (
            <TouchableOpacity style={{
                backgroundColor: '#D9D9D9'
            }}
              key={index}
              className="w-[44%] h-40 rounded-xl justify-center items-center shadow"
            >
              <Ionicons name={item.icon} color="#000" style={{ fontSize: RFValue(40) }} />
              <Text className="mt-2 font-poppinsMedium" style={{ fontSize: RFValue(12) }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão Personalizar */}
        <TouchableOpacity className="p-4 mt-10 rounded-lg flex-row items-center justify-center shadow" style={{backgroundColor:'#D9D9D9'}}>
          <MaterialIcons name="edit" size={30} color="black" />
          <Text className="ml-2 font-medium font-poppins">Personalizar refeições</Text>
        </TouchableOpacity>

        {/* Botão Mudar preferências */}
        <TouchableOpacity className=" p-4 mt-4 rounded-lg flex-row items-center justify-center shadow" style={{backgroundColor:'#D9D9D9'}}> 
          <Ionicons name="person-outline" size={30} color="black" />
          <Text className="ml-2 font-medium font-poppins">
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