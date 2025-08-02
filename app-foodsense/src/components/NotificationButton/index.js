import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const NotificationButton = () => {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkUnreadNotifications();
    }
  }, [isFocused]);

  const checkUnreadNotifications = async () => {
    try {
      const notificacoesSalvas = await AsyncStorage.getItem('notificacoesRecebidas');
      if (notificacoesSalvas !== null) {
        const notificacoes = JSON.parse(notificacoesSalvas);
        setHasUnread(notificacoes.length > 0);
      } else {
        setHasUnread(false);
      }
    } catch (error) {
      console.error('Erro ao verificar notificações não lidas:', error);
    }
  };

  return (
    <TouchableOpacity onPress={() => router.push('/notificacoes')} style={{ alignItems: 'center' }} activeOpacity={0.7}>
      <View>
        <Ionicons
          name="notifications"
          color="black"
          style={{ fontSize: moderateScale(30) }}
        />
        {hasUnread && (
          <View
            style={{
              position: 'absolute',
              right: 2,
              top: 2,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              borderWidth: 2,
              borderColor: 'white',
            }}
          />
        )}
      </View>
      <Text
        style={{ fontSize: moderateScale(10.5), fontFamily: 'Poppins-Medium' }}
      >
        {' '}
        Notificações
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationButton;