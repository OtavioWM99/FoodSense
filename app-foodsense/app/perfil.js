import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { useAuth } from '../src/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../src/components/ContinuarButton';
import VoltarButton from '../src/components/VoltarButton';
import Header from '../src/components/Header'; // Importar o componente Header
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons

export default function Perfil() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  // Genero removido
  const [exercicios, setExercicios] = useState('');
  
  const [availableRestrictions, setAvailableRestrictions] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [profileRes, userRestrictionsRes, allRestrictionsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('usuario_restricoes').select('restricao_id').eq('usuario_id', user.id),
        supabase.from('restricoes_alimentares').select('*')
      ]);

      if (profileRes.error) throw profileRes.error;
      if (userRestrictionsRes.error) throw userRestrictionsRes.error;
      if (allRestrictionsRes.error) throw allRestrictionsRes.error;

      const profile = profileRes.data;
      setNome(profile.nome || '');
      setIdade(profile.idade?.toString() || '');
      setPeso(profile.peso?.toString() || '');
      setAltura(profile.altura?.toString() || '');
      // Genero removido
      setExercicios(profile.exercicios_semana?.toString() || '');

      setAvailableRestrictions(allRestrictionsRes.data || []);
      setSelectedRestrictions(userRestrictionsRes.data.map(r => r.restricao_id) || []);

    } catch (error) {
      Alert.alert('Erro ao buscar perfil', error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggleRestriction = (id) => {
    setSelectedRestrictions(current => 
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
  };

  async function handleUpdateProfile() {
    if (!user) return;
    setLoading(true);

    // Validação dos campos (similar ao infoCadastro)
    if (!nome || !idade || !peso || !altura || !exercicios) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const parsedIdade = parseInt(idade);
    if (isNaN(parsedIdade) || parsedIdade <= 0 || parsedIdade > 120) {
      Alert.alert('Erro', 'Idade inválida. Por favor, insira um número entre 1 e 120.');
      setLoading(false);
      return;
    }

    const parsedPeso = parseFloat(peso);
    if (isNaN(parsedPeso) || parsedPeso <= 0) {
      Alert.alert('Erro', 'Peso inválido. Por favor, insira um número positivo.');
      setLoading(false);
      return;
    }

    const parsedAltura = parseInt(altura);
    if (isNaN(parsedAltura) || parsedAltura <= 0) {
      Alert.alert('Erro', 'Altura inválida. Por favor, insira um número positivo.');
      setLoading(false);
      return;
    }

    const parsedExercicios = parseInt(exercicios);
    if (isNaN(parsedExercicios) || parsedExercicios < 0 || parsedExercicios > 7) {
      Alert.alert('Erro', 'Dias de exercício inválidos. Por favor, insira um número entre 0 e 7.');
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').update({
        nome,
        idade: parsedIdade,
        peso: parsedPeso,
        altura: parsedAltura,
        // Genero removido
        exercicios_semana: parsedExercicios,
    }).eq('id', user.id);

    if (profileError) {
        Alert.alert('Erro ao atualizar perfil', profileError.message);
        setLoading(false);
        return;
    }

    const { error: deleteError } = await supabase.from('usuario_restricoes').delete().eq('usuario_id', user.id);
    if (deleteError) {
        Alert.alert('Erro ao limpar restrições antigas', deleteError.message);
        setLoading(false);
        return;
    }

    if (selectedRestrictions.length > 0) {
        const restrictionsToInsert = selectedRestrictions.map(id => ({ usuario_id: user.id, restricao_id: id }));
        const { error: insertError } = await supabase.from('usuario_restricoes').insert(restrictionsToInsert);
        if (insertError) {
            Alert.alert('Erro ao salvar novas restrições', insertError.message);
            setLoading(false);
            return;
        }
    }

    setLoading(false);
    Alert.alert('Sucesso', 'Seu perfil foi atualizado.');
  }

  async function handleLogout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      Alert.alert('Erro ao sair', error.message);
    } else {
      router.replace('/(auth)'); // Redireciona para a tela de login
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#4ade80', '#14b8a6']} style={{ flex: 1 }}>
            {/* Componente Header */}
            <Header />

            {/* Botão Voltar Personalizado */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={moderateScale(24)} color="white" 
                />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Meu Perfil</Text>
                
                {/* Texto Explicativo */}
                <Text style={styles.explanatoryText}>
                    Visualize e edite suas informações pessoais e restrições alimentares.
                </Text>

                {loading ? <Text style={{color: 'white'}}>Carregando...</Text> : (
                    <View style={styles.formContainer}>
                        {/* Nome */}
                        <Text style={styles.inputLabel}>Nome</Text>
                        <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />
                        
                        {/* Idade */}
                        <Text style={styles.inputLabel}>Idade</Text>
                        <TextInput style={styles.input} placeholder="Ex: 30" value={idade} onChangeText={setIdade} keyboardType="numeric" />
                        
                        {/* Peso */}
                        <Text style={styles.inputLabel}>Peso (kg)</Text>
                        <TextInput style={styles.input} placeholder="Ex: 70.5" value={peso} onChangeText={setPeso} keyboardType="decimal-pad" />
                        
                        {/* Altura */}
                        <Text style={styles.inputLabel}>Altura (cm)</Text>
                        <TextInput style={styles.input} placeholder="Ex: 175" value={altura} onChangeText={setAltura} keyboardType="numeric" />
                        
                        {/* Dias de Exercício */}
                        <Text style={styles.inputLabel}>Dias de exercício/semana</Text>
                        <TextInput style={styles.input} placeholder="Ex: 3" value={exercicios} onChangeText={setExercicios} keyboardType="numeric" />

                        <Text style={styles.subtitle}>Minhas Restrições Alimentares</Text>
                        <View style={styles.restrictionsContainer}>
                            {availableRestrictions.map(r => (
                                <TouchableOpacity 
                                    key={r.id} 
                                    style={[styles.restrictionButton, selectedRestrictions.includes(r.id) && styles.restrictionSelected]}
                                    onPress={() => toggleRestriction(r.id)}
                                >
                                    <Text style={[styles.restrictionText, selectedRestrictions.includes(r.id) && styles.restrictionTextSelected]}>{r.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{alignItems: 'center', marginTop: verticalScale(20)}}>
                            <ContinuarButton onPress={handleUpdateProfile} text="Salvar Alterações" />
                            <VoltarButton onPress={handleLogout} text="Sair (Logout)" />
                        </View>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', padding: moderateScale(10) },
    title: { fontSize: moderateScale(27), paddingTop: verticalScale(15), marginBottom: verticalScale(20), color: '#FFFFFF', fontFamily: 'Poppins-Bold', textAlign: 'center' },
    explanatoryText: { fontSize: moderateScale(14), color: '#FFFFFF', fontFamily: 'Poppins-Regular', textAlign: 'center', marginBottom: verticalScale(20), paddingHorizontal: moderateScale(20) },
    subtitle: { fontSize: moderateScale(18), marginTop: verticalScale(20), marginBottom: verticalScale(10), color: '#FFFFFF', fontFamily: 'Poppins-Medium' },
    formContainer: { width: '90%', alignItems: 'center' },
    inputLabel: { fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium', alignSelf: 'flex-start', width: scale(250) },
    input: { fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular', paddingLeft: moderateScale(8) },
    
    restrictionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' },
    restrictionButton: { backgroundColor: '#FFF', paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(15), borderRadius: 20, margin: moderateScale(5), minWidth: scale(100), flexGrow: 1, alignItems: 'center' },
    restrictionSelected: { backgroundColor: '#34d399' },
    restrictionText: { fontFamily: 'Poppins-Regular', color: '#333' },
    restrictionTextSelected: { color: '#FFF', fontFamily: 'Poppins-Bold' },

    backButton: {
        position: 'absolute',
        marginTop: verticalScale(60),
        left: moderateScale(20),
        zIndex: 10,
        padding: moderateScale(10),
    },
});