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
          className="flex-1 justify-center items-center"
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, alignItems: 'center'}}>
              <Text className="text-white text-center font-poppinsBold" style={{ 
                    alignItems: 'center',
                    fontSize: moderateScale(27),
                    paddingTop: verticalScale(50),
                    marginBottom: verticalScale(30),
                }}>
                    Crie sua conta
              </Text>

              <View style={{ width: scale(290), alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 16, padding: 10, opacity: 0.7, ...shadowStyle.shadow }}>
                <Text className="text-black font-poppinsMedium text-center" style={{ 
                      fontSize: moderateScale(14), marginBottom: verticalScale(10)
                  }}>
                      Fale um pouco sobre sua alimentação (intolerância, alergia, preferências, etc)
                </Text>

                <TextInput
                  className="bg-white rounded-lg font-poppinsRegular"
                  style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20) }}
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