import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Calendar1() {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toISOString().split('T')[0]);
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="bg-white rounded-lg p-3 mb-4 shadow-md">
      <Calendar
        current={currentDate}
        minDate={'2024-01-01'}
        maxDate={'2025-12-31'}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          [currentDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'blue' },
        }}
        monthFormat={'MMMM yyyy'}
        firstDay={1}
        hideArrows={false}
        className="rounded-lg"
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e4',
          arrowColor: '#2d4150',
          monthTextColor: '#2d4150',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
        }}
      />
      {selectedDate ? (
        <Text className="text-center text-gray-700 mt-2">
          Data selecionada: {selectedDate}
        </Text>
      ) : null}
    </View>
  );
}