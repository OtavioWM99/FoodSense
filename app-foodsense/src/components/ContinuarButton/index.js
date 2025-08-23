import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { shadowStyle } from '../Shadow';

const ContinuarButton = ({ onPress, text }) => {
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
          borderRadius: moderateScale(24),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={{ fontSize: moderateScale(14), textAlign: 'center', color: 'white', fontFamily: 'Poppins-Medium' }}
      >
        {text || 'Continuar'}
      </Text>
    </TouchableOpacity>
  );
};

export default ContinuarButton;
