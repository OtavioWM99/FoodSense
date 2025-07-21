import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { shadowStyle } from '../../src/components/Shadow';


export default function CardapioScreen() {

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

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient 
          colors={['#4ade80', '#14b8a6']}
          className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Título */}
          <Text style={{ 
              fontSize: moderateScale(20),
              marginTop: verticalScale(40),
            }} className="font-poppinsBold text-center text-white">
            Encontre opções para suas refeições diárias
          </Text>

          <Text className="font-poppinsMedium text-center text-white"
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
              { label: ' Jantar', icon: 'wine-outline' },
            ].map((item, index) => (
              <TouchableOpacity style={[
                  shadowStyle.shadow,
                  {
                  backgroundColor: '#D9D9D9',
                  width: scale(140),
                  height: verticalScale(120),
                  marginTop: moderateScale(20),
                  }
                ]}
                key={index}
                className="rounded-3xl justify-center items-center shadow"
                activeOpacity={0.7}
              >
                <Ionicons name={item.icon} color="#000" style={{ fontSize: moderateScale(50) }} />
                <Text className="font-poppinsMedium" style={{ 
                    fontSize: moderateScale(14),
                    marginTop: moderateScale(5),
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão Mudar preferências */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="rounded-full flex-row items-center justify-center shadow" 
            style={[
              shadowStyle.shadow, 
              {
              backgroundColor:'#D9D9D9',
              padding: moderateScale(10),
              marginTop: verticalScale(25),
              marginLeft: scale (25),
              width: scale(300), 
            }]}> 
            <Ionicons name="person-outline" style={{ fontSize:  moderateScale(23) }} color="black" />
            <Text className="ml-2 font-poppinsMedium" style={{ fontSize:  moderateScale(12) }}>Mudar intolerâncias ou preferências</Text>
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
    </SafeAreaView>
  );
}