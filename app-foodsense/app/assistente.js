import { useRouter } from "expo-router";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { shadowStyle } from "../src/components/Shadow";

const initialMessages = [
    {
        id: 1,
        text: 'Olá! Sou sua assistente virtual para criação de cardápios e receitas. Como posso te ajudar hoje?',
        sender: 'assistant'
    },
    {
        id: 2,
        text: 'Gostaria de criar um café da manhã sem glúten.',
        sender: 'user'
    },
];

export default function Assistente() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
            setInput('');
            // Aqui, adicionar a lógica para a resposta da IA
        }
    };

    return (
        <LinearGradient
            colors={['#4ade80', '#14b8a6']}
            style={{ flex: 1 }}
        >
            <Header />
            <View style={{ flex: 1, padding: moderateScale(20) }}>
                <Text style={{
                    fontSize: moderateScale(28),
                    fontFamily: 'Poppins-Bold',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: verticalScale(15),
                }}>Assistente virtual</Text>

                <Text style={{
                    fontSize: moderateScale(15.5),
                    fontFamily: 'Poppins-Medium',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: verticalScale(15),
                }}>Vou te ajudar a formar novos cardápios e receitas</Text>

                <View style={{ flex: 1, backgroundColor: '#C2C2C2', borderRadius: moderateScale(10), padding: moderateScale(10), opacity: 0.85, ...shadowStyle.shadow }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {messages.map(message => (
                            <View 
                                key={message.id} 
                                style={[
                                    {
                                        padding: moderateScale(10),
                                        borderRadius: moderateScale(10),
                                        marginBottom: verticalScale(10),
                                        maxWidth: '80%',
                                    },
                                    message.sender === 'user' ? 
                                        { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' } : 
                                        { alignSelf: 'flex-start', backgroundColor: '#fff' }
                                ]}
                            >
                                <Text style={{ fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' }}>{message.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: moderateScale(10) }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#D9D9D9', borderRadius: moderateScale(20), paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(10), marginRight: moderateScale(10), fontFamily: 'Poppins-Regular', }}
                            placeholder="Digite sua mensagem..."
                            value={input}
                            onChangeText={setInput}
                        />
                        <TouchableOpacity onPress={handleSend} style={{ backgroundColor: '#14b8a6', padding: moderateScale(10), borderRadius: 50 }}>
                            <Ionicons name="send" size={moderateScale(24)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: verticalScale(20), alignItems: 'center' }}>
                    <VoltarButton onPress={() => router.back()} />
                </View>
            </View>
        </LinearGradient>
    )
}
