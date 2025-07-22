import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shadowStyle } from '../../src/components/Shadow';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();
  const [isAlmocoEnabled, setIsAlmocoEnabled] = useState(false);
  const [isJantaEnabled, setIsJantaEnabled] = useState(false);

  const toggleAlmocoSwitch = () => setIsAlmocoEnabled(previousState => !previousState);
  const toggleJantaSwitch = () => setIsJantaEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#4ade80', '#14b8a6']}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Welcome Message */}
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: 'white',
              textAlign: 'center',
              fontSize: moderateScale(26),
              marginTop: verticalScale(20),
              marginBottom: verticalScale(30),
            }}
          >
            Olá (nome do usuário)
          </Text>

          {/* Buttons Section */}
          <View style={{ marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              style={[
                shadowStyle.shadow,
                {
                  backgroundColor: '#D9D9D9',
                  width: scale(140),
                  height: verticalScale(120),
                  borderRadius: moderateScale(15),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => router.push('/cardapio')}
            >
              <Ionicons name="map-outline" size={moderateScale(50)} color="black" />
              <Text
                style={{ fontSize: moderateScale(14), marginTop: verticalScale(5), fontFamily: 'Poppins-Medium', textAlign: 'center' }}
              >
                Meus cardápios
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                shadowStyle.shadow,
                {
                  backgroundColor: '#D9D9D9',
                  width: scale(140),
                  height: verticalScale(120),
                  borderRadius: moderateScale(15),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => router.push('/receitas')}
            >
              <Ionicons name="pizza-outline" size={moderateScale(50)} color="black" />
              <Text
                style={{ fontSize: moderateScale(14), marginTop: verticalScale(5), fontFamily: 'Poppins-Medium', textAlign: 'center' }}
              >
                Minhas receitas
              </Text>
            </TouchableOpacity>
          </View>

          {/* Calendar Section */}
          <View
            style={[
              shadowStyle.shadow,
              {
                backgroundColor: '#D9D9D9',
                marginHorizontal: scale(20),
                borderRadius: moderateScale(15),
                padding: moderateScale(15),
                marginBottom: verticalScale(20),
              },
            ]}
          >
            <Calendar
              monthFormat={'MMMM yyyy'}
              hideArrows={false}
              hideExtraDays={true}
              enableSwipeMonths={true}
              theme={{
                backgroundColor: '#D9D9D9',
                calendarBackground: '#D9D9D9',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'black',
                monthTextColor: 'black',
                textDayFontFamily: 'Poppins-Regular',
                textMonthFontFamily: 'Poppins-Bold',
                textDayHeaderFontFamily: 'Poppins-SemiBold',
                textDayFontSize: moderateScale(14),
                textMonthFontSize: moderateScale(16),
                textDayHeaderFontSize: moderateScale(12),
              }}
            />
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#000000', marginVertical: verticalScale(10), opacity: 0.2 }} />
            <View style={{ marginTop: verticalScale(5), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: moderateScale(14), fontFamily: 'Poppins-Medium' }}>
                Nova notificação personalizada
              </Text>
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={moderateScale(24)} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reminders Section */}
          <View
            style={[
              shadowStyle.shadow,
              {
                backgroundColor: '#D9D9D9',
                marginHorizontal: scale(20),
                borderRadius: moderateScale(15),
                padding: moderateScale(15),
                marginBottom: verticalScale(20),
              },
            ]}
          >
            <Text
              style={{ fontSize: moderateScale(20), marginBottom: verticalScale(10), fontFamily: 'Poppins-Bold', textAlign: 'center' }}
            >
              Lembretes
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(2) }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: moderateScale(16) }}>
                  Lembrete de Almoço
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(14) }}>
                  12:00h
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(12) }}>
                  seg, ter, qua, qui, sex
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAlmocoEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleAlmocoSwitch}
                value={isAlmocoEnabled}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(10) }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: moderateScale(16) }}>
                  Lembrete de Janta
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(14) }}>
                  20:00h
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(12) }}>
                  seg, ter, qua, qui, sex
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isJantaEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleJantaSwitch}
                value={isJantaEnabled}
              />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#000000', marginVertical: verticalScale(10), opacity: 0.2 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(4) }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: moderateScale(14) }}>
                Novo lembrete personalizado
              </Text>
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={moderateScale(24)} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
