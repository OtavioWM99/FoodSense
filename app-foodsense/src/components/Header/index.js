import React from 'react';
import { View } from 'react-native';
import MeuPerfilButton from '../MeuPerfilButton';
import NotificationButton from '../NotificationButton';

const Header = () => {
  return (
    <View style={{ justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20, backgroundColor: 'white', flexDirection: 'row' }}>
      <NotificationButton />
      <MeuPerfilButton />
    </View>
  );
};

export default Header;
