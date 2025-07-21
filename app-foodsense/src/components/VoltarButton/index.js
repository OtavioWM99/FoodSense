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
        },
      ]}
      className="rounded-full items-center justify-center"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        className="text-center text-white font-poppinsMedium"
        style={{ fontSize: moderateScale(14) }}
      >
        Voltar
      </Text>
    </TouchableOpacity>
  );
};

export default VoltarButton;
