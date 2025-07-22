import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { shadowStyle } from '../Shadow';

const VoltarButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[
        shadowStyle.shadow,
        {
          width: scale(250),
          height: moderateScale(40),
          backgroundColor: '#C2C2C2',
          borderRadius: moderateScale(24),
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={{ fontSize: moderateScale(14), textAlign: 'center', color: 'white', fontFamily: 'Poppins-Medium' }}
      >
        Voltar
      </Text>
    </TouchableOpacity>
  );
};

export default VoltarButton;
