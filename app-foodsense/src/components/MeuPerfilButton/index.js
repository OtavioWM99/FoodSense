import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

const MeuPerfilButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/perfil')} style={{ alignItems: 'center' }} activeOpacity={0.7}>
      <Ionicons
        name="person-sharp"
        color="black"
        style={{ fontSize: moderateScale(30) }}
      />
      <Text
        style={{ fontSize: moderateScale(10.5), fontFamily: 'Poppins-Medium' }}
      >
        {' '}
        Meu perfil
      </Text>
    </TouchableOpacity>
  );
};

export default MeuPerfilButton;