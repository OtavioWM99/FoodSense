import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.notification}>
        Veja essa nova pesquisa sobre intolerância ao glúten e um possível tratamento em estudo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  notification: { fontSize: 14 },
});