import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { shadowStyle } from '../../src/components/Shadow';
import { useRouter } from 'expo-router';


export default function CardapioScreen() {
  const router = useRouter();

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

    <LinearGradient
          colors={['#4ade80', '#14b8a6']}
          style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Título */}
            <Text style={{
                fontSize: moderateScale(20),
                marginTop: verticalScale(30),
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
                color: 'white',
              }}>
              Encontre opções para suas refeições diárias
            </Text>

            <Text
              style = {{
                fontSize: moderateScale(18.5),
                marginTop: verticalScale(25),
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                color: 'white',
              }}>
              Seu cardápio personalizado
            </Text>

            {/* Grade de botões */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {[
                { label: 'Café da manhã', icon: 'cafe-outline', onPress: () => router.push('/cafeManha') },
                { label: 'Almoço', icon: 'restaurant-outline', onPress: () => router.push('/almoco') },
                { label: 'Lanches', icon: 'fast-food-outline', onPress: () => router.push('/lanches') },
                { label: ' Jantar', icon: 'wine-outline', onPress: () => router.push('/jantar') },
              ].map((item, index) => (
                <TouchableOpacity style={[
                    shadowStyle.shadow,
                    {
                    backgroundColor: '#D9D9D9',
                    width: scale(140),
                    height: verticalScale(120),
                    marginTop: moderateScale(20),
                    borderRadius: moderateScale(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                    }
                  ]}
                  key={index}
                  activeOpacity={0.7}
                  onPress={item.onPress}
                >
                  <Ionicons name={item.icon} color="#000" style={{ fontSize: moderateScale(50) }} />
                  <Text style={{
                      fontSize: moderateScale(14),
                      marginTop: moderateScale(5),
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Botão Mudar preferências */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/perfil')}
              style={[
                shadowStyle.shadow,
                {
                backgroundColor:'#D9D9D9',
                padding: moderateScale(10),
                marginTop: verticalScale(25),
                marginLeft: scale (25),
                width: scale(300),
                borderRadius: moderateScale(24),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }]}>
              <Ionicons name="person" style={{ fontSize:  moderateScale(23) }} color="black" />
              <Text style={{ fontSize:  moderateScale(12), marginLeft: scale(2), fontFamily: 'Poppins-Medium' }}>Personalize seu perfil</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
}