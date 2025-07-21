import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoCadastro() {
  const router = useRouter();
  const [info, setInfo] = useState('');

  
  const shadowStyle = {
    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  };

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

              <View style={{ width: scale(290), alignItems: 'center' }}>
                <Text className="text-white font-poppinsMedium text-center" style={{ 
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

              <TouchableOpacity
                style = {{ marginTop: verticalScale(20), width: scale(250), height: moderateScale(40), backgroundColor: "#949494", marginBottom: verticalScale(12), ...shadowStyle }}
                className="rounded-full items-center justify-center"
                onPress={() => router.replace('/home')}
                activeOpacity={0.7}
              >
                <Text className="text-center text-white font-poppinsMedium" style={{ fontSize: moderateScale(14) }}>Continuar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style = {{ width: scale(250), height: moderateScale(40), backgroundColor: "#C2C2C2", ...shadowStyle }}
                className="rounded-full items-center justify-center"
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Text className="text-center text-white font-poppinsMedium" style={{ fontSize: moderateScale(14) }}>Voltar</Text>
              </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
  );
}