import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../../src/components/ContinuarButton';
import VoltarButton from '../../src/components/VoltarButton';
import { supabase } from '../../src/lib/supabase';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (loading) return;
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro no cadastro', error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
        Alert.alert('Erro no cadastro', 'Não foi possível criar o usuário. Tente novamente.');
        setLoading(false);
        return;
    }

    // Usa o upsert para garantir que o perfil seja criado, mesmo se o trigger não existir.
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ id: data.user.id, nome: nome });

    if (profileError) {
        // O ideal aqui seria deletar o usuário recém criado para evitar inconsistência
        // await supabase.auth.admin.deleteUser(data.user.id)
        Alert.alert('Erro ao salvar perfil', profileError.message);
        setLoading(false);
        return;
    }
    
    setLoading(false);
    router.push('/(auth)/infoCadastro');
  }

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

          <ContinuarButton onPress={handleSignUp} />
          <VoltarButton onPress={() => router.back()} />
          
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}