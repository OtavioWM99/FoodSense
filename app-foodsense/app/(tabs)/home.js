import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shadowStyle } from '../../src/components/Shadow';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { requestPermissionsAsync } from '../../src/utils/notifications';
import LembreteModal from '../../src/components/LembreteModal';
import NotificacaoPersonalizadaModal from '../../src/components/NotificacaoPersonalizadaModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function Home() {
  const router = useRouter();
  const [lembretes, setLembretes] = useState([]);
  const [notificacoesPersonalizadas, setNotificacoesPersonalizadas] = useState([]);
  const [lembreteModalVisible, setLembreteModalVisible] = useState(false);
  const [notificacaoModalVisible, setNotificacaoModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    requestPermissionsAsync();
    loadLembretes();
    loadNotificacoesPersonalizadas();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { lembreteId, originalTrigger } = response.notification.request.content.data;
      if (lembreteId && originalTrigger) {
        const nextTrigger = new Date(originalTrigger);
        nextTrigger.setDate(nextTrigger.getDate() + 7);
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Lembrete de Refeição',
            body: response.notification.request.content.body,
            data: { lembreteId, originalTrigger: nextTrigger.toISOString() },
          },
          trigger: nextTrigger,
        });
      }
    });

    const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
      try {
        const notificacoesSalvas = await AsyncStorage.getItem('notificacoesRecebidas');
        const antigasNotificacoes = notificacoesSalvas ? JSON.parse(notificacoesSalvas) : [];
        const novaNotificacao = {
          id: notification.request.identifier,
          title: notification.request.content.title,
          body: notification.request.content.body,
          receivedAt: new Date().toISOString(),
        };
        const novasNotificacoes = [novaNotificacao, ...antigasNotificacoes];
        await AsyncStorage.setItem('notificacoesRecebidas', JSON.stringify(novasNotificacoes));
      } catch (error) {
        console.error("Erro ao salvar notificação recebida:", error);
      }
    });

    return () => {
      responseSubscription.remove();
      receivedSubscription.remove();
    };
  }, []);

  useEffect(() => {
    updateMarkedDates();
  }, [notificacoesPersonalizadas]);

  const loadLembretes = async () => {
    try {
      const lembretesSalvos = await AsyncStorage.getItem('lembretes');
      if (lembretesSalvos !== null) {
        const lembretesParseados = JSON.parse(lembretesSalvos);
        const lembretesComData = lembretesParseados.map(lembrete => ({
          ...lembrete,
          time: new Date(lembrete.time),
        }));
        setLembretes(lembretesComData);
      }
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    }
  };

  const loadNotificacoesPersonalizadas = async () => {
    try {
      const notificacoesSalvas = await AsyncStorage.getItem('notificacoesPersonalizadas');
      if (notificacoesSalvas !== null) {
        const notificacoesParseadas = JSON.parse(notificacoesSalvas);
        setNotificacoesPersonalizadas(notificacoesParseadas);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações personalizadas:', error);
    }
  };

  const updateMarkedDates = () => {
    const dates = {};
    notificacoesPersonalizadas.forEach(notificacao => {
      const dateString = new Date(notificacao.dateTime).toISOString().split('T')[0];
      dates[dateString] = { marked: true, dotColor: '#14b8a6' };
    });
    setMarkedDates(dates);
  };

  const handleSaveLembrete = async (lembrete) => {
    try {
      const novoLembrete = { ...lembrete, id: Date.now().toString(), ativo: true, notificationIds: [] };
      const now = new Date();
      const currentDay = now.getDay();

      for (const dia of lembrete.dias) {
        let daysUntilTarget = dia - currentDay;
        if (daysUntilTarget < 0) {
          daysUntilTarget += 7;
        }
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + daysUntilTarget);
        targetDate.setHours(lembrete.time.getHours(), lembrete.time.getMinutes(), 0, 0);
        if (targetDate.getTime() <= now.getTime()) {
          targetDate.setDate(targetDate.getDate() + 7);
        }
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Lembrete de Refeição',
            body: lembrete.nome,
            data: { lembreteId: novoLembrete.id, originalTrigger: targetDate.toISOString() },
          },
          trigger: targetDate,
        });
        novoLembrete.notificationIds.push(notificationId);
      }

      const novosLembretes = [...lembretes, novoLembrete];
      setLembretes(novosLembretes);
      await AsyncStorage.setItem('lembretes', JSON.stringify(novosLembretes));
      setLembreteModalVisible(false);
      Alert.alert("Sucesso", "Lembrete criado com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar lembrete:', error);
    }
  };

  const handleSaveNotificacaoPersonalizada = async (notificacao) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificacao.nome,
          body: notificacao.descricao,
        },
        trigger: notificacao.dateTime,
      });

      const novaNotificacao = { ...notificacao, id: notificationId };
      const novasNotificacoes = [...notificacoesPersonalizadas, novaNotificacao];
      setNotificacoesPersonalizadas(novasNotificacoes);
      await AsyncStorage.setItem('notificacoesPersonalizadas', JSON.stringify(novasNotificacoes));
      setNotificacaoModalVisible(false);
      Alert.alert("Sucesso", "Notificação personalizada criada com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar notificação personalizada:', error);
    }
  };

  const handleToggleLembrete = async (id) => {
    // ... (lógica existente)
  };

  const handleDeleteLembrete = async (id) => {
    // ... (lógica existente)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#4ade80', '#14b8a6']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontFamily: 'Poppins-Bold', color: 'white', textAlign: 'center', fontSize: moderateScale(26), marginTop: verticalScale(20), marginBottom: verticalScale(30) }}>
            Olá (nome do usuário)
          </Text>

          <View style={{ marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={[shadowStyle.shadow, { backgroundColor: '#D9D9D9', width: scale(140), height: verticalScale(120), borderRadius: moderateScale(15), justifyContent: 'center', alignItems: 'center' }]} activeOpacity={0.7} onPress={() => router.push('/cardapio')}>
              <Ionicons name="map-outline" size={moderateScale(50)} color="black" />
              <Text style={{ fontSize: moderateScale(14), marginTop: verticalScale(5), fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                Meus cardápios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[shadowStyle.shadow, { backgroundColor: '#D9D9D9', width: scale(140), height: verticalScale(120), borderRadius: moderateScale(15), justifyContent: 'center', alignItems: 'center' }]} activeOpacity={0.7} onPress={() => router.push('/receitas')}>
              <Ionicons name="pizza-outline" size={moderateScale(50)} color="black" />
              <Text style={{ fontSize: moderateScale(14), marginTop: verticalScale(5), fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                Minhas receitas
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[shadowStyle.shadow, { backgroundColor: '#D9D9D9', marginHorizontal: scale(20), borderRadius: moderateScale(15), padding: moderateScale(15), marginBottom: verticalScale(20) }]}>
            <Calendar
              monthFormat={'MMMM yyyy'}
              hideArrows={false}
              hideExtraDays={true}
              enableSwipeMonths={true}
              markedDates={markedDates}
              theme={{
                backgroundColor: '#D9D9D9',
                calendarBackground: '#D9D9D9',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'black',
                monthTextColor: 'black',
                textDayFontFamily: 'Poppins-Regular',
                textMonthFontFamily: 'Poppins-Bold',
                textDayHeaderFontFamily: 'Poppins-SemiBold',
                textDayFontSize: moderateScale(14),
                textMonthFontSize: moderateScale(16),
                textDayHeaderFontSize: moderateScale(12),
              }}
            />
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#000000', marginVertical: verticalScale(10), opacity: 0.2 }} />
            <View style={{ marginTop: verticalScale(5), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: moderateScale(14), fontFamily: 'Poppins-Medium' }}>
                Nova notificação personalizada
              </Text>
              <TouchableOpacity onPress={() => setNotificacaoModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={moderateScale(24)} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[shadowStyle.shadow, { backgroundColor: '#D9D9D9', marginHorizontal: scale(20), borderRadius: moderateScale(15), padding: moderateScale(15), marginBottom: verticalScale(20) }]}>
            <Text style={{ fontSize: moderateScale(20), marginBottom: verticalScale(10), fontFamily: 'Poppins-Bold', textAlign: 'center' }}>
              Lembretes
            </Text>
            {lembretes.map((lembrete) => (
              <View key={lembrete.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(10) }}>
                <View>
                  <Text style={{ fontFamily: 'Poppins-Medium', fontSize: moderateScale(16) }}>
                    {lembrete.nome}
                  </Text>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(14) }}>
                    {lembrete.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(12) }}>
                    {lembrete.dias.map(dia => ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][dia]).join(', ')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#30F388" }}
                    thumbColor={lembrete.ativo ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => handleToggleLembrete(lembrete.id)}
                    value={lembrete.ativo}
                  />
                  <TouchableOpacity style={{ marginLeft: moderateScale(10) }} onPress={() => handleDeleteLembrete(lembrete.id)}>
                    <Ionicons name="trash-outline" size={moderateScale(24)} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#000000', marginVertical: verticalScale(10), opacity: 0.2 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(4) }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: moderateScale(14) }}>
                Novo lembrete personalizado
              </Text>
              <TouchableOpacity onPress={() => setLembreteModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={moderateScale(24)} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <LembreteModal
          visible={lembreteModalVisible}
          onClose={() => setLembreteModalVisible(false)}
          onSave={handleSaveLembrete}
        />
        <NotificacaoPersonalizadaModal
          visible={notificacaoModalVisible}
          onClose={() => setNotificacaoModalVisible(false)}
          onSave={handleSaveNotificacaoPersonalizada}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
''