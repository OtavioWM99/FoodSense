import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, FlatList } from "react-native";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import { shadowStyle } from "../src/components/Shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';

export default function Notificacoes() {
    const router = useRouter();
    const [notificacoes, setNotificacoes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadNotificacoes();
        }
    }, [isFocused]);

    const loadNotificacoes = async () => {
        try {
            const notificacoesSalvas = await AsyncStorage.getItem('notificacoesRecebidas');
            if (notificacoesSalvas !== null) {
                setNotificacoes(JSON.parse(notificacoesSalvas));
            }
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const novasNotificacoes = notificacoes.filter(notificacao => notificacao.id !== id);
            setNotificacoes(novasNotificacoes);
            await AsyncStorage.setItem('notificacoesRecebidas', JSON.stringify(novasNotificacoes));
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                marginBottom: verticalScale(15),
                width: '100%',
                justifyContent: 'space-between',
            }}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ 
                    fontSize: moderateScale(16), 
                    fontFamily: 'Poppins-SemiBold',
                    color: '#000000'
                }}>
                    {item.title}
                </Text>
                <Text style={{ 
                    fontSize: moderateScale(14), 
                    fontFamily: 'Poppins-Regular',
                    color: '#333'
                }}>
                    {item.body}
                </Text>
            </View>

            <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7} onPress={() => handleMarkAsRead(item.id)}>
                <Ionicons name="checkmark-outline" size={moderateScale(24)} color="green" />
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient
            colors={['#4ade80', '#14b8a6']}
            style={{ flex: 1 }}
        >
            <Header />
            <View style={{ padding: moderateScale(20), flex: 1 }}>
                <Text style={{
                    fontSize: moderateScale(28),
                    fontFamily: 'Poppins-Bold',
                    color: 'white',
                    textAlign: 'center',
                    marginTop: verticalScale(15),
                    marginBottom: verticalScale(10),
                }}>Notificações</Text>

                <View style={{ flex: 1, width: scale(320), alignSelf: 'center', backgroundColor: '#D9D9D9', borderRadius: 16, padding: moderateScale(10), opacity: 0.7, ...shadowStyle.shadow, marginBottom: verticalScale(20) }}>
                    {notificacoes.length > 0 ? (
                        <FlatList
                            data={notificacoes}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: moderateScale(16), marginTop: verticalScale(20) }}>
                            Nenhuma notificação nova.
                        </Text>
                    )}
                </View>

                <View style={{ alignItems: 'center' }}>
                    <VoltarButton onPress={() => router.back()} />
                </View>
            </View>
        </LinearGradient>
    )
}