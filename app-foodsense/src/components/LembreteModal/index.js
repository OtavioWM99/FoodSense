import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';

const LembreteModal = ({ visible, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dias, setDias] = useState([]);

  const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const toggleDia = (diaIndex) => {
    if (dias.includes(diaIndex)) {
      setDias(dias.filter((d) => d !== diaIndex));
    } else {
      setDias([...dias, diaIndex]);
    }
  };

  const handleSave = () => {
    onSave({ nome, time, dias });
    setNome('');
    setTime(new Date());
    setDias([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Novo Lembrete</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do lembrete"
            value={nome}
            onChangeText={setNome}
          />
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setTime(selectedTime);
                }
              }}
            />
          )}
          <View style={styles.diasContainer}>
            {diasDaSemana.map((dia, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.diaButton, dias.includes(index) && styles.diaButtonSelected]}
                onPress={() => toggleDia(index)}
              >
                <Text style={[styles.diaText, dias.includes(index) && styles.diaTextSelected]}>{dia}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    width: scale(300),
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
    marginBottom: verticalScale(20),
    fontFamily: 'Poppins-Regular',
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  timeText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Medium',
  },
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  diaButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    width: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaButtonSelected: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
  },
  diaText: {
    fontFamily: 'Poppins-Regular',
  },
  diaTextSelected: {
    color: 'white',
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

export default LembreteModal;
