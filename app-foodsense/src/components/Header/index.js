import React from 'react';
import { View, StyleSheet } from 'react-native';
import MeuPerfilButton from '../MeuPerfilButton';
import NotificationButton from '../NotificationButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.headerContainer,
      { paddingTop: insets.top } // Adiciona padding superior baseado na safe area
    ]}>
      <NotificationButton />
      <MeuPerfilButton />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    // Adicione altura mínima se necessário, ou deixe o conteúdo definir
    minHeight: 60, // Exemplo de altura mínima para o header
    alignItems: 'center', // Centraliza verticalmente os botões
  },
});

export default Header;