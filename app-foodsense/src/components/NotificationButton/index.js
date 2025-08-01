import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

const NotificationButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/notificacoes')} style={{ alignItems: 'center' }} activeOpacity={0.7}>
      <Ionicons
        name="notifications"
        color="black"
        style={{ fontSize: moderateScale(30) }}
      />
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