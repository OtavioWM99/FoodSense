import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale, s } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import VoltarButton from '../src/components/VoltarButton';
import { shadowStyle } from '../src/components/Shadow';
import Header from '../src/components/Header';

export default function Perfil() {
  const router = useRouter();
  const [info, setInfo] = useState('');

  return (
    <LinearGradient
      colors={['#4ade80', '#14b8a6']}
      style={{ flex: 1 }}
    >
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: moderateScale(20), alignItems: 'center' }}>
                <Text style={{ 
                    alignItems: 'center',
                    fontSize: moderateScale(28),
                    paddingTop: verticalScale(20),
                    marginBottom: verticalScale(15),
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Bold'
                }}>
                Perfil
                </Text>
                <View style={{ width: scale(290), marginBottom: verticalScale(20), alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 16, padding: 10, opacity: 0.7, ...shadowStyle.shadow }}>
                    <Text style={{ 
                        fontSize: moderateScale(14), 
                        marginBottom: verticalScale(10),
                        color: '#000000',
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center'
                    }}>
                    Modifique suas informações registradas ( intolerância, alergia, preferências, etc)
                    </Text>
                    <TextInput
                      style={{ 
                           fontSize: moderateScale(15), 
                           width: scale(250), 
                           padding: moderateScale(8), 
                           marginBottom: verticalScale(20), 
                           fontFamily: 'Poppins-Regular', 
                           backgroundColor: '#FFFFFF', 
                           borderRadius: moderateScale(8) 
                       }}
                      placeholder="Digite aqui..."
                      placeholderTextColor="#B5B5B5"
                      value={info}
                      multiline
                      onChangeText={setInfo}
                      textAlignVertical="top"
                    />
                </View>

                <VoltarButton onPress={() => router.back()} />

                </View>

         </ScrollView>
     </LinearGradient>
  );
}