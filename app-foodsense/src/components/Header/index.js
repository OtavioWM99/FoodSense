import React from 'react';
import { View } from 'react-native';
import MeuPerfilButton from '../MeuPerfilButton';
import NotificationButton from '../NotificationButton';

const Header = () => {
  return (
    <View className="bg-white flex-row pr-6 pl-4 justify-between">
      <NotificationButton />
      <MeuPerfilButton />
    </View>
  );
};

export default Header;
