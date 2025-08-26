import { useRouter } from "expo-router";
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import VoltarButton from "../src/components/VoltarButton";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { shadowStyle } from "../src/components/Shadow";
import { useAuth } from "../src/providers/AuthProvider";

const initialMessages = [
    {
        id: 1,
        text: 'Olá! Sou sua assistente virtual para criação de cardápios e receitas. Como posso te ajudar hoje?',
        sender: 'assistant'
    },
];

export default function Assistente() {
    const router = useRouter();
    const { session } = useAuth();
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) {
            return;
        }

        const userMessage = {
            id: messages.length + 1,
            text: input,
            sender: 'user'
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            if (!session?.user?.id) {
                throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
            }

            const response = await fetch(process.env.EXPO_PUBLIC_N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    prompt: currentInput,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
            }

            const aiMessageText = await response.text(); // Get response as plain text

            if (aiMessageText) { // Check if the text is not empty
                const assistantMessage = {
                    id: messages.length + 2,
                    text: aiMessageText,
                    sender: 'assistant'
                };
                setMessages(prevMessages => [...prevMessages, assistantMessage]);
            } else {
                throw new Error("A IA retornou uma resposta vazia.");
            }

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            const errorMessage = {
                id: messages.length + 2,
                text: `Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente. (${error.message})`,
                sender: 'assistant'
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
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
                        {isLoading && (
                            <View style={{ alignItems: 'flex-start', marginBottom: verticalScale(10) }}>
                                <View style={{
                                    padding: moderateScale(10),
                                    borderRadius: moderateScale(10),
                                    backgroundColor: '#fff'
                                }}>
                                    <ActivityIndicator size="small" color="#14b8a6" />
                                </View>
                            </View>
                        )}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: moderateScale(10) }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#D9D9D9', borderRadius: moderateScale(20), paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(10), marginRight: moderateScale(10), fontFamily: 'Poppins-Regular', }}
                            placeholder={isLoading ? "Aguardando resposta..." : "Digite sua mensagem..."}
                            value={input}
                            onChangeText={setInput}
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={handleSend} style={{ backgroundColor: isLoading ? '#ccc' : '#14b8a6', padding: moderateScale(10), borderRadius: 50 }} disabled={isLoading}>
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
