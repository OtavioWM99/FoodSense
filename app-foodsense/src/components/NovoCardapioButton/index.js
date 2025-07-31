import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

const NovoCardapioButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#949494',
          padding: moderateScale(15),
          borderRadius: moderateScale(10),
          width: '100%',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: moderateScale(16),
            fontFamily: 'Poppins-Medium',
          }}
        >
          Crie um novo cardápio com nosso assistente
        </Text>
      </View>
      <Ionicons
        name="add-circle-outline"
        size={moderateScale(24)}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default NovoCardapioButton;
