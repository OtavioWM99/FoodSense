import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import { shadowStyle } from "../src/components/Shadow";

export default function Notificacoes() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#4ade80', '#14b8a6']}
            style={{ flex: 1 }}
        >
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: moderateScale(20), alignItems: 'center' }}>
                    
                    <Text style={{
                        fontSize: moderateScale(28),
                        fontFamily: 'Poppins-Bold',
                        color: 'white',
                        textAlign: 'center',
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(10),
                    }}>Notificações</Text>

                    <View style={{ width: scale(320), alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 16, padding: moderateScale(10), opacity: 0.7, ...shadowStyle.shadow, marginBottom: verticalScale(20) }}>
                        <Text style={{ 
                            fontSize: moderateScale(20), 
                            color: '#000000',
                            fontFamily: 'Poppins-SemiBold',
                            textAlign: 'center'
                        }}>
                            Minhas notificações
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10),
                                padding: moderateScale(10),
                                marginBottom: verticalScale(15),
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ 
                                fontSize: moderateScale(16), 
                                fontFamily: 'Poppins-Regular',
                                color: '#000000'
                            }}>
                                Almoço sem glúten
                            </Text>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7}>
                                    <Ionicons name="checkmark-outline" size={moderateScale(24)} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7}>
                                    <Ionicons name="trash-outline" size={moderateScale(24)} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <VoltarButton onPress={() => router.back()} />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}