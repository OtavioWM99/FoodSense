import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { shadowStyle } from '../Shadow';

const ContinuarButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[
        shadowStyle.shadow,
        {
          marginTop: verticalScale(20),
          width: scale(250),
          height: moderateScale(40),
          backgroundColor: '#949494',
          marginBottom: verticalScale(12),
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
        Continuar
      </Text>
    </TouchableOpacity>
  );
};

export default ContinuarButton;
