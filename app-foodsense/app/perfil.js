import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { useAuth } from '../src/providers/AuthProvider';
import Header from '../src/components/Header';
import ContinuarButton from '../src/components/ContinuarButton';
import VoltarButton from '../src/components/VoltarButton';

export default function Perfil() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [genero, setGenero] = useState('');
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
      setGenero(profile.genero || '');
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

    const { error: profileError } = await supabase.from('profiles').update({
        nome,
        idade: idade ? parseInt(idade) : null,
        peso: peso ? parseFloat(peso) : null,
        altura: altura ? parseFloat(altura) : null,
        genero: genero,
        exercicios_semana: exercicios ? parseInt(exercicios) : null,
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

  return (
    <LinearGradient colors={['#4ade80', '#14b8a6']} style={{ flex: 1 }}>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>
            {loading ? <Text style={{color: 'white'}}>Carregando...</Text> : (
                <View style={styles.formContainer}>
                    <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
                    <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Peso (kg)" value={peso} onChangeText={setPeso} keyboardType="decimal-pad" />
                    <TextInput style={styles.input} placeholder="Altura (cm)" value={altura} onChangeText={setAltura} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
                    <TextInput style={styles.input} placeholder="Dias de exercício/semana" value={exercicios} onChangeText={setExercicios} keyboardType="numeric" />

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
                        <VoltarButton onPress={() => supabase.auth.signOut()} text="Sair (Logout)" />
                    </View>
                </View>
            )}
         </ScrollView>
     </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', padding: moderateScale(10) },
    title: { fontSize: moderateScale(27), paddingTop: verticalScale(10), marginBottom: verticalScale(10), color: '#FFFFFF', fontFamily: 'Poppins-Bold', textAlign: 'center' },
    subtitle: { fontSize: moderateScale(18), marginTop: verticalScale(20), marginBottom: verticalScale(10), color: '#FFFFFF', fontFamily: 'Poppins-Medium' },
    formContainer: { width: '90%' },
    input: { backgroundColor: 'white', borderRadius: moderateScale(8), padding: moderateScale(10), marginBottom: verticalScale(10), fontFamily: 'Poppins-Regular', fontSize: moderateScale(14) },
    restrictionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: verticalScale(20) },
    restrictionButton: { backgroundColor: '#FFF', padding: moderateScale(10), borderRadius: 20, margin: 5 },
    restrictionSelected: { backgroundColor: '#34d399' },
    restrictionText: { fontFamily: 'Poppins-Regular', color: '#333' },
    restrictionTextSelected: { color: '#FFF', fontFamily: 'Poppins-Bold' },
});