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
  const [sexoSelecionado, setSexoSelecionado] = useState(''); // Novo estado para sexo
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

    // Validação dos campos
    if (!idade || !peso || !altura || !sexoSelecionado || !exercicios) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const parsedIdade = parseInt(idade);
    if (isNaN(parsedIdade) || parsedIdade <= 0 || parsedIdade > 120) {
      Alert.alert('Erro', 'Idade inválida. Por favor, insira um número entre 1 e 120.');
      return;
    }

    const parsedPeso = parseFloat(peso);
    if (isNaN(parsedPeso) || parsedPeso <= 0) {
      Alert.alert('Erro', 'Peso inválido. Por favor, insira um número positivo.');
      return;
    }

    const parsedAltura = parseInt(altura);
    if (isNaN(parsedAltura) || parsedAltura <= 0) {
      Alert.alert('Erro', 'Altura inválida. Por favor, insira um número positivo.');
      return;
    }

    const parsedExercicios = parseInt(exercicios);
    if (isNaN(parsedExercicios) || parsedExercicios < 0 || parsedExercicios > 7) {
      Alert.alert('Erro', 'Dias de exercício inválidos. Por favor, insira um número entre 0 e 7.');
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        Alert.alert('Erro', 'Sessão de usuário não encontrada. Por favor, tente fazer o cadastro novamente.');
        router.replace('/(auth)');
        return;
    }

    setLoading(true);

    const { error: profileError } = await supabase.from('profiles').update({
        idade: parsedIdade,
        peso: parsedPeso,
        altura: parsedAltura,
        genero: sexoSelecionado, // Usando o novo estado de sexo
        exercicios_semana: parsedExercicios,
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

  async function handleVoltar() {
    Alert.alert(
        "Confirmar Ação",
        "Tem certeza que deseja voltar? Sua conta será excluída e você precisará se cadastrar novamente.",
        [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Confirmar", 
                onPress: async () => {
                    setLoading(true);
                    const { error } = await supabase.functions.invoke('delete-user');
                    setLoading(false);
                    
                    if (error) {
                        console.error('Erro ao chamar Edge Function delete-user:', error);
                        Alert.alert(
                            'Erro ao Excluir Conta',
                            `Não foi possível remover sua conta. Por favor, tente novamente. (Erro: ${error.message})`,
                            [{ text: 'OK' }]
                        );
                    } else {
                        console.log('Usuário deletado com sucesso. Forçando logout local e redirecionando para a raiz.');
                        await supabase.auth.signOut(); // Força o logout localmente
                        router.replace('/'); // Redireciona para a raiz
                    }
                },
                style: 'destructive' 
            }
        ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#4ade80', '#14b8a6']} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Complete seu Perfil</Text>
              
              {/* Texto Explicativo */}
              <Text style={styles.explanatoryText}>
                Coletamos estas informações para otimizar o uso do aplicativo,
                permitindo que nossa assistente virtual ofereça opções mais
                personalizadas de acordo com suas necessidades.
              </Text>

              <View style={styles.formContainer}>
                {/* Idade */}
                <Text style={styles.inputLabel}>Idade</Text>
                <TextInput style={styles.input} placeholder="Ex: 30" value={idade} onChangeText={setIdade} keyboardType="numeric" />
                
                {/* Peso */}
                <Text style={styles.inputLabel}>Peso (kg)</Text>
                <TextInput style={styles.input} placeholder="Ex: 70.5" value={peso} onChangeText={setPeso} keyboardType="decimal-pad" />
                
                {/* Altura */}
                <Text style={styles.inputLabel}>Altura (cm)</Text>
                <TextInput style={styles.input} placeholder="Ex: 175" value={altura} onChangeText={setAltura} keyboardType="numeric" />
                
                {/* Sexo */}
                <Text style={styles.inputLabel}>Sexo</Text>
                <View style={styles.genderOptionsContainer}>
                  <TouchableOpacity
                    style={[styles.genderButton, sexoSelecionado === 'Masculino' && styles.genderButtonSelected]}
                    onPress={() => setSexoSelecionado('Masculino')}
                  >
                    <Text style={[styles.genderButtonText, sexoSelecionado === 'Masculino' && styles.genderButtonTextSelected]}>Masculino</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderButton, sexoSelecionado === 'Feminino' && styles.genderButtonSelected]}
                    onPress={() => setSexoSelecionado('Feminino')}
                  >
                    <Text style={[styles.genderButtonText, sexoSelecionado === 'Feminino' && styles.genderButtonTextSelected]}>Feminino</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderButton, sexoSelecionado === 'Prefiro não informar' && styles.genderButtonSelected]}
                    onPress={() => setSexoSelecionado('Prefiro não informar')}
                  >
                    <Text style={[styles.genderButtonText, sexoSelecionado === 'Prefiro não informar' && styles.genderButtonTextSelected]}>Prefiro não informar</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Dias de Exercício */}
                <Text style={styles.inputLabel}>Dias de exercício/semana</Text>
                <TextInput style={styles.input} placeholder="Ex: 3" value={exercicios} onChangeText={setExercicios} keyboardType="numeric" />

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
              <VoltarButton onPress={handleVoltar} />
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', padding: moderateScale(10) },
    title: { fontSize: moderateScale(27), paddingTop: verticalScale(20), marginBottom: verticalScale(20), color: '#FFFFFF', fontFamily: 'Poppins-Bold', textAlign: 'center' },
    explanatoryText: { fontSize: moderateScale(14), color: '#FFFFFF', fontFamily: 'Poppins-Regular', textAlign: 'center', marginBottom: verticalScale(20), paddingHorizontal: moderateScale(20) },
    subtitle: { fontSize: moderateScale(18), marginTop: verticalScale(20), marginBottom: verticalScale(10), color: '#FFFFFF', fontFamily: 'Poppins-Medium' },
    formContainer: { width: '90%', alignItems: 'center' }, // Centraliza os inputs
    inputLabel: { fontSize: moderateScale(18), marginBottom: verticalScale(2), color: 'white', fontFamily: 'Poppins-Medium', alignSelf: 'flex-start', width: scale(250) }, // Alinha label com input
    input: { fontSize: moderateScale(15), width: scale(250), marginBottom: verticalScale(20), backgroundColor: 'white', borderRadius: moderateScale(8), fontFamily: 'Poppins-Regular', paddingLeft: moderateScale(8) },
    
    // Estilos para seleção de Sexo
    genderOptionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: scale(250), marginBottom: verticalScale(20) },
    genderButton: { backgroundColor: '#FFF', paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(15), borderRadius: moderateScale(8), marginVertical: moderateScale(5), width: '30%', alignItems: 'center' },
    genderButtonSelected: { backgroundColor: '#34d399' },
    genderButtonText: { fontFamily: 'Poppins-Regular', color: '#333', fontSize: moderateScale(12) },
    genderButtonTextSelected: { color: '#FFF', fontFamily: 'Poppins-Bold' },

    // Estilos para Restrições Alimentares
    restrictionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }, // Centraliza e ocupa largura total
    restrictionButton: { backgroundColor: '#FFF', paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(15), borderRadius: 20, margin: moderateScale(5), minWidth: scale(100), flexGrow: 1, alignItems: 'center' }, // Mais largo e flexível
    restrictionSelected: { backgroundColor: '#34d399' },
    restrictionText: { fontFamily: 'Poppins-Regular', color: '#333' },
    restrictionTextSelected: { color: '#FFF', fontFamily: 'Poppins-Bold' },
});