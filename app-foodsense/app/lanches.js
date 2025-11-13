import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { shadowStyle } from "../src/components/Shadow";
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import NovoCardapioButton from '../src/components/NovoCardapioButton';
import { supabase } from "../src/lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "../src/providers/AuthProvider";

export default function Lanches() {
    const router = useRouter();
    const [refeicoes, setRefeicoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth();

    useEffect(() => {
        if (session) {
            const fetchCardapios = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('cardapios_salvos')
                    .select('*')
                    .eq('usuario_id', session.user.id)
                    .eq('tipo', 'lanches');

                if (error) {
                    console.error('Erro ao buscar cardápios:', error);
                    Alert.alert('Erro', 'Ocorreu um erro ao buscar seus cardápios.');
                } else {
                    setRefeicoes(data);
                }
                setLoading(false);
            };

            fetchCardapios();
        }
    }, [session]);

    const handleDelete = (itemId) => {
        Alert.alert(
          "Confirmar Exclusão",
          "Tem certeza que deseja excluir este item? Esta ação é irreversível.",
          [
            {
              text: "Voltar",
              style: "cancel"
            },
            {
              text: "Confirmar",
              onPress: async () => {
                const { error } = await supabase
                  .from('cardapios_salvos')
                  .delete()
                  .eq('id', itemId);
  
                if (error) {
                  console.error('Erro ao excluir:', error);
                  Alert.alert("Erro", "Não foi possível excluir o item.");
                } else {
                  setRefeicoes(currentRefeicoes => currentRefeicoes.filter(item => item.id !== itemId));
                }
              },
              style: "destructive"
            }
          ]
        );
    };

    return (
        <LinearGradient
            colors={['#4ade80', '#14b8a6']}
            style={{ flex: 1 }}
        >
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: moderateScale(20), alignItems: 'center' }}>
                    
                    <Text style={{
                        fontSize: moderateScale(22),
                        fontFamily: 'Poppins-Bold',
                        color: 'white',
                        textAlign: 'center',
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(20),
                    }}>Lanches</Text>

                    <View style={{ width: scale(320), alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 16, padding: moderateScale(10), opacity: 0.7, ...shadowStyle.shadow, marginBottom: verticalScale(20) }}>
                        <Text style={{ 
                            fontSize: moderateScale(20), 
                            color: '#000000',
                            fontFamily: 'Poppins-SemiBold',
                            textAlign: 'center'
                        }}>
                            Meus cardápios
                        </Text>


                        {loading ? (
                            <ActivityIndicator size="large" color="white" style={{ marginVertical: verticalScale(50) }} />
                        ) : (
                            <View style={{ marginTop: verticalScale(20), width: '100%' }}>
                                {refeicoes.map(refeicao => (
                                    <TouchableOpacity 
                                        key={refeicao.id} 
                                        style={[
                                            {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: '#F5F5F5',
                                                borderRadius: moderateScale(10),
                                                padding: moderateScale(10),
                                                marginBottom: verticalScale(15),
                                            }
                                        ]}
                                        activeOpacity={0.7}
                                        onPress={() => router.push(`/detalhe-item/${refeicao.id}?table=cardapios_salvos`)}
                                    >
                                        {/* <Image source={refeicao.imagem} style={{ width: scale(80), height: verticalScale(80), borderRadius: moderateScale(10) }} /> */}
                                        <View style={{ marginLeft: moderateScale(15), flex: 1 }}>
                                            <Text style={{
                                                fontSize: moderateScale(16),
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>{refeicao.nome}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                                {/* {refeicao.icones.map((icone, index) => (
                                                    <Image key={index} source={icone} style={{ width: scale(24), height: verticalScale(24), marginRight: moderateScale(10) }} />
                                                ))} */}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7} onPress={(e) => {
                                                e.stopPropagation();
                                                handleDelete(refeicao.id);
                                            }}>
                                                <Ionicons name="trash-outline" size={moderateScale(24)} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <NovoCardapioButton onPress={() => router.push('/assistente')} />

                    </View>

                    <VoltarButton onPress={() => router.push('/(tabs)/cardapio')} />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}