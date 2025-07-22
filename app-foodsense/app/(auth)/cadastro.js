import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../../src/components/ContinuarButton';
import VoltarButton from '../../src/components/VoltarButton';

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
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <Text style={{
            fontSize: moderateScale(27),
            paddingTop: verticalScale(50),
            marginBottom: verticalScale(30),
            color: 'white',
            fontFamily: 'Poppins-Bold',
            textAlign: 'center'
          }}>
            Crie sua conta
          </Text>

          <Text style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium' }}>Nome de usuário</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular', paddingLeft: moderateScale(8) }}
            placeholder="Seu nome"
            placeholderTextColor="#B5B5B5"
            value={nome}
            onChangeText={setNome}
          />

          <Text style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium' }}>Email</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular', paddingLeft: moderateScale(8) }}
            placeholder="Seu email"
            placeholderTextColor="#B5B5B5"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium' }} >Crie sua senha</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular', paddingLeft: moderateScale(8) }}
            placeholder="Senha"
            placeholderTextColor="#B5B5B5"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style = {{fontSize: moderateScale(18), marginBottom: verticalScale(2), fontFamily: 'Poppins-Medium', color: 'white' }}>Confirme sua senha</Text>
          <TextInput
            style={{ fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), fontFamily: 'Poppins-Regular', backgroundColor: 'white', borderRadius: moderateScale(8), paddingLeft: moderateScale(8) }}
            placeholder="Confirmar senha"
            placeholderTextColor="#B5B5B5"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <ContinuarButton onPress={() => router.push('/(auth)/infoCadastro')} />
          <VoltarButton onPress={() => router.back()} />
          
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}