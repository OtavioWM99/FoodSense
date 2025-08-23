import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinuarButton from '../../src/components/ContinuarButton';
import VoltarButton from '../../src/components/VoltarButton';
import { supabase } from '../../src/lib/supabase';

export default function InfoCadastro() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [genero, setGenero] = useState('');
  const [exercicios, setExercicios] = useState('');
  
  const [availableRestrictions, setAvailableRestrictions] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  useEffect(() => {
    const fetchRestrictions = async () => {
      const { data, error } = await supabase.from('restricoes_alimentares').select('*');
      if (error) {
        Alert.alert('Erro', 'Não foi possível buscar as restrições alimentares.');
      } else {
        setAvailableRestrictions(data);
      }
    };
    fetchRestrictions();
  }, []);

  const toggleRestriction = (id) => {
    setSelectedRestrictions(current => 
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
  };

  async function handleSaveProfile() {
    if (loading) return;

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        Alert.alert('Erro', 'Sessão de usuário não encontrada. Por favor, tente fazer o cadastro novamente.');
        router.replace('/(auth)');
        return;
    }

    setLoading(true);

    const { error: profileError } = await supabase.from('profiles').update({
        idade: idade ? parseInt(idade) : null,
        peso: peso ? parseFloat(peso) : null,
        altura: altura ? parseFloat(altura) : null,
        genero: genero,
        exercicios_semana: exercicios ? parseInt(exercicios) : null,
    }).eq('id', user.id);

    if (profileError) {
        Alert.alert('Erro ao salvar perfil', profileError.message);
        setLoading(false);
        return;
    }

    if (selectedRestrictions.length > 0) {
        const restrictionsToInsert = selectedRestrictions.map(id => ({ usuario_id: user.id, restricao_id: id }));
        const { error: restrictionsError } = await supabase.from('usuario_restricoes').insert(restrictionsToInsert);
        if (restrictionsError) {
            Alert.alert('Erro ao salvar restrições', restrictionsError.message);
            setLoading(false);
            return;
        }
    }

    setLoading(false);
    Alert.alert('Sucesso!', 'Seu perfil foi configurado.');
    router.replace('/home');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#4ade80', '#14b8a6']} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Complete seu Perfil</Text>
              
              <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Peso (kg)" value={peso} onChangeText={setPeso} keyboardType="decimal-pad" />
                <TextInput style={styles.input} placeholder="Altura (cm)" value={altura} onChangeText={setAltura} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
                <TextInput style={styles.input} placeholder="Dias de exercício/semana" value={exercicios} onChangeText={setExercicios} keyboardType="numeric" />

                <Text style={styles.subtitle}>Restrições Alimentares</Text>
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
              </View>

              <ContinuarButton onPress={handleSaveProfile} />
              <VoltarButton onPress={() => router.back()} />
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', padding: moderateScale(10) },
    title: { fontSize: moderateScale(27), paddingTop: verticalScale(20), marginBottom: verticalScale(20), color: '#FFFFFF', fontFamily: 'Poppins-Bold', textAlign: 'center' },
    subtitle: { fontSize: moderateScale(18), marginTop: verticalScale(20), marginBottom: verticalScale(10), color: '#FFFFFF', fontFamily: 'Poppins-Medium' },
    formContainer: { width: '90%' },
    input: { backgroundColor: 'white', borderRadius: moderateScale(8), padding: moderateScale(10), marginBottom: verticalScale(10), fontFamily: 'Poppins-Regular', fontSize: moderateScale(14) },
    restrictionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    restrictionButton: { backgroundColor: '#FFF', padding: moderateScale(10), borderRadius: 20, margin: 5 },
    restrictionSelected: { backgroundColor: '#34d399' },
    restrictionText: { fontFamily: 'Poppins-Regular', color: '#333' },
    restrictionTextSelected: { color: '#FFF', fontFamily: 'Poppins-Bold' },
});
