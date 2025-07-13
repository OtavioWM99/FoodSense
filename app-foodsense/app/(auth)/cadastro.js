import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#4ade80', '#14b8a6']}
        className="flex-1 justify-center items-center px-8"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <Text className="text-white text-center font-poppinsBold" style={{
            fontSize: moderateScale(27),
            paddingTop: verticalScale(50),
            marginBottom: verticalScale(30),
          }}>
            Crie sua conta
          </Text>

          <Text className="text-white font-poppinsMedium" style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2) }}>Nome de usuário</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20) }}
            className="bg-white rounded-lg font-poppinsRegular"
            placeholder="Seu nome"
            placeholderTextColor="#B5B5B5"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-white font-poppinsMedium" style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2) }}>Email</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20) }}
            className="bg-white rounded-lg font-poppinsRegular"
            placeholder="Seu email"
            placeholderTextColor="#B5B5B5"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-white font-poppinsMedium" style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2) }} >Crie sua senha</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20) }}
            className="bg-white rounded-lg font-poppinsRegular"
            placeholder="Senha"
            placeholderTextColor="#B5B5B5"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text className="text-white font-poppinsMedium" style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2) }}>Confirme sua senha</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), padding: moderateScale(8), marginBottom: verticalScale(20) }}
            className="bg-white rounded-lg font-poppinsRegular"
            placeholder="Confirmar senha"
            placeholderTextColor="#B5B5B5"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <TouchableOpacity
            style = {{ marginTop: verticalScale(20), width: scale(250), height: moderateScale(40), backgroundColor: "#949494", marginBottom: verticalScale(12) }}
            className="rounded-full items-center justify-center"
            onPress={() => router.push('/auth/infoCadastro')}
            activeOpacity={0.7}
          >
            <Text className="text-center text-white font-poppinsMedium" style={{ fontSize: moderateScale(14) }}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style = {{ width: scale(250), height: moderateScale(40), backgroundColor: "#C2C2C2" }}
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