import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReminderSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lembretes</Text>
      <View style={styles.reminder}>
        <Text>Lembrete de Almoço</Text>
        <Text>seg, ter, qua, qui, sex</Text>
      </View>
      <View style={styles.reminder}>
        <Text>Lembrete de Janta</Text>
        <Text>20:00h seg, ter, qua, qui, sex</Text>
      </View>
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
  reminder: { marginBottom: 5 },
});