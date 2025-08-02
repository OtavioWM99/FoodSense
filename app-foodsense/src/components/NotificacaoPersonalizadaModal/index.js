import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotificacaoPersonalizadaModal = ({ visible, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const finalDateTime = new Date(date);
    finalDateTime.setHours(time.getHours());
    finalDateTime.setMinutes(time.getMinutes());

    onSave({ nome, descricao, dateTime: finalDateTime });
    setNome('');
    setDescricao('');
    setDate(new Date());
    setTime(new Date());
    onClose();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Nova Notificação</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da notificação"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={[styles.input, { height: verticalScale(80) }]}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
          <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
              <Text style={styles.pickerText}>Data: {date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickerButton}>
              <Text style={styles.pickerText}>Hora: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onTimeChange}
            />
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    width: scale(320),
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginBottom: verticalScale(15),
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  pickerButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(5),
    padding: moderateScale(12),
    alignItems: 'center',
    width: '48%',
  },
  pickerText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#14b8a6',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});

export default NotificacaoPersonalizadaModal;
