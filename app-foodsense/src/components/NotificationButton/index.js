import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const NotificationButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
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