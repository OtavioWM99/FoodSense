import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const MeuPerfilButton = ({ onPress }) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <Ionicons
        name="person-sharp"
        color="black"
        style={{ fontSize: moderateScale(30) }}
      />
      <Text
        style={{ fontSize: moderateScale(10.5) }}
        className="font-poppinsMedium"
      >
        {' '}
        Meu perfil
      </Text>
    </TouchableOpacity>
  );
};

export default MeuPerfilButton;
