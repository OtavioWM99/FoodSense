import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale, s } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../../src/components/ContinuarButton';
import VoltarButton from '../../src/components/VoltarButton';
import { shadowStyle } from '../../src/components/Shadow';

export default function InfoCadastro() {
  const router = useRouter();
  const [info, setInfo] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#4ade80', '#14b8a6']}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, alignItems: 'center'}}>
              <Text style={{ 
                    alignItems: 'center',
                    fontSize: moderateScale(27),
                    paddingTop: verticalScale(50),
                    marginBottom: verticalScale(30),
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Bold'
                }}>
                    Crie sua conta
              </Text>

              <View style={{ width: scale(290), alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 16, padding: 10, opacity: 0.7, ...shadowStyle.shadow }}>
                <Text style={{ 
                      fontSize: moderateScale(14), 
                      marginBottom: verticalScale(10),
                      color: '#000000',
                      fontFamily: 'Poppins-Medium',
                      textAlign: 'center'
                  }}>
                      Fale um pouco sobre sua alimentação (intolerância, alergia, preferências, etc)
                </Text>

                <TextInput
                  style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20), fontFamily: 'Poppins-Regular', backgroundColor: '#FFFFFF', borderRadius: moderateScale(8) }}
                  placeholder="Digite aqui..."
                  placeholderTextColor="#B5B5B5"
                  value={info}
                  multiline
                  onChangeText={setInfo}
                  textAlignVertical="top"
                />
              </View>

              <ContinuarButton onPress={() => router.replace('/home')} />
              <VoltarButton onPress={() => router.back()} />
              
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
  );
}