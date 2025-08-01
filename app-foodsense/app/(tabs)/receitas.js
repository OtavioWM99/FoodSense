import { View, Text, TouchableOpacity, ScrollView, Image, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; //biblioteca size-matters para responsividade
import { shadowStyle } from '../../src/components/Shadow';
import { useRouter } from 'expo-router';


export default function ReceitasScreen() {
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

    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient 
          colors={['#4ade80', '#14b8a6']}
          style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Título */}
          <Text style={{ 
              fontSize: moderateScale(20),
              marginTop: verticalScale(40),
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
              color: 'white',
            }}>
            Encontre receitas com alimentos alternativos
          </Text>

          {/* Grade de botões */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {[
              { label: 'Sem glúten', onPress: () => router.push('/receitasSemGluten'), image: require('../../assets/icons/gluten-free.png'), width: scale(75), height: scale(75), labelMarginBottom: moderateScale(1), labelMarginTop: moderateScale(1) },
              { label: 'Sem lactose', onPress: () => router.push('/receitasSemLactose'), image: require('../../assets/icons/lactose-free.png'), width: scale(90), height: scale(90), labelMarginBottom: moderateScale(10), labelMarginTop: moderateScale(-6) },
              { label: 'Veganas', onPress: () => router.push('/receitasVeganas'), image: require('../../assets/icons/vegan.png' ), width: scale(65), height: scale(65), labelMarginBottom: moderateScale(-4), labelMarginTop: moderateScale(6) },
              { label: 'Baixo teor de frutose', image: require('../../assets/icons/fructose-low.png'), width: scale(75), height: scale(75), labelMarginBottom: moderateScale(2), labelMarginTop: moderateScale(2) },
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
                <Image
                    source={item.image}
                    style={{
                      width: item.width,
                      height: item.height,
                      resizeMode: 'contain',
                    }}
                />
                <Text style={{ 
                    fontSize: moderateScale(12.5),
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    marginBottom: item.labelMarginBottom,
                    marginTop: item.labelMarginTop
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão Mudar preferências */}
          <TouchableOpacity 
            activeOpacity={0.7} 
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
            <Text style={{ fontSize:  moderateScale(12), marginLeft: scale(2), fontFamily: 'Poppins-Medium' }}>Mudar intolerâncias ou preferências</Text>
          </TouchableOpacity>
        </ScrollView>

        
      </LinearGradient>
    </SafeAreaView>
  );
}