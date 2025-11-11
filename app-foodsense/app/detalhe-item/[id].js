import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../src/components/Header';
import VoltarButton from "../../src/components/VoltarButton";
import { shadowStyle } from "../../src/components/Shadow";

export default function DetalheItem() {
  const { id, table } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && table) {
      const fetchItem = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError(error.message);
          console.error('Error fetching item:', error);
        } else {
          setItem(data);
        }
        setLoading(false);
      };

      fetchItem();
    }
  }, [id, table]);

  if (loading) {
    return (
        <LinearGradient colors={['#4ade80', '#14b8a6']} style={styles.gradient}>
            <SafeAreaView style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="white" />
            </SafeAreaView>
        </LinearGradient>
    );
  }

  if (error || !item) {
    return (
        <LinearGradient colors={['#4ade80', '#14b8a6']} style={styles.gradient}>
            <SafeAreaView style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>Erro ao carregar o item.</Text>
                <TouchableOpacity style={styles.backButtonError} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4ade80', '#14b8a6']} style={styles.gradient}>
          <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.nome}</Text>
                    <Text style={styles.content}>{item.conteudo}</Text>
                </View>
                <VoltarButton onPress={() => router.back()} style={styles.voltarButton} />
            </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(25),
    },
    scrollContainer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(40),
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(20),
        fontFamily: 'Poppins-SemiBold',
        marginBottom: verticalScale(10),
        textAlign: 'center',
        color: 'black',
    },
    contentContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        padding: moderateScale(15),
        opacity: 0.9,
        ...shadowStyle.shadow,
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20),
    },
    content: {
        fontSize: moderateScale(15),
        fontFamily: 'Poppins-Regular',
        lineHeight: 28,
        color: '#374151',
    },
    errorText: {
        fontSize: moderateScale(15),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    voltarButton: {
        marginTop: verticalScale(20),
    },
});