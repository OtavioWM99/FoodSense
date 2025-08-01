import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { shadowStyle } from "../src/components/Shadow";
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import NovoCardapioButton from '../src/components/NovoCardapioButton';

const receitas = [
    {
        id: 1,
        nome: 'Bolo de cenoura sem lactose',
        // imagem: require('../assets/panqueca.png'),
        icones: [
            // require('../assets/icons/vegan.png'),
            // require('../assets/icons/lactose-free.png'),
        ]
    },
    {
        id: 2,
        nome: 'Estrogonofe sem lactose',
        // imagem: require('../assets/iogurte.png'),
        icones: [
            // require('../assets/icons/gluten-free.png'),
        ]
    },
    {
        id: 3,
        nome: 'Pudim sem lactose',
        // imagem: require('../assets/ovos.png'),
        icones: [
            // require('../assets/icons/gluten-free.png'),
            // require('../assets/icons/fructose-low.png'),
        ]
    }
]

export default function ReceitasSemLactose() {
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
                    }}>Receitas personalizadas sem lactose</Text>

                    <View style={{ width: scale(320), alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 16, padding: moderateScale(10), opacity: 0.7, ...shadowStyle.shadow, marginBottom: verticalScale(20) }}>
                        <Text style={{ 
                            fontSize: moderateScale(20), 
                            color: '#000000',
                            fontFamily: 'Poppins-SemiBold',
                            textAlign: 'center'
                        }}>
                            Minhas receitas
                        </Text>


                        <View style={{ marginTop: verticalScale(20), width: '100%' }}>
                            {receitas.map(refeicao => (
                                <TouchableOpacity 
                                    key={refeicao.id} 
                                    style={[
                                        {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#F5F5F5',
                                            borderRadius: moderateScale(10),
                                            padding: moderateScale(10),
                                            marginBottom: verticalScale(15),
                                        }
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => {/* Futura tela de edição */}}
                                >
                                    {/* <Image source={refeicao.imagem} style={{ width: scale(80), height: verticalScale(80), borderRadius: moderateScale(10) }} /> */}
                                    <View style={{ marginLeft: moderateScale(15), flex: 1 }}>
                                        <Text style={{
                                            fontSize: moderateScale(16),
                                            fontFamily: 'Poppins-SemiBold',
                                        }}>{refeicao.nome}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                            {refeicao.icones.map((icone, index) => (
                                                <Image key={index} source={icone} style={{ width: scale(24), height: verticalScale(24), marginRight: moderateScale(10) }} />
                                            ))}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7}>
                                            <Ionicons name="create-outline" size={moderateScale(24)} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: moderateScale(5) }} activeOpacity={0.7}>
                                            <Ionicons name="trash-outline" size={moderateScale(24)} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <NovoCardapioButton onPress={() => router.push('/assistente')} />

                    </View>

                    <VoltarButton onPress={() => router.push('/(tabs)/receitas')} />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}