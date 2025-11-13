import { createContext, useContext, useState } from 'react';

const initialMessages = [
    {
        id: 1,
        text: 'Olá! Sou sua assistente virtual. Estou aqui para ajudar você a criar refeições deliciosas e seguras para suas necessidades.\n\nO que você gostaria de fazer?\n\n1️⃣ Criar um cardápio completo para uma refeição.\n2️⃣ Gerar uma receita única.\n\nOBS: Digite apenas o número da opção desejada',
        sender: 'assistant'
    },
];

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [conversationState, setConversationState] = useState({
    messages: initialMessages,
    currentConversationState: 'start',
    lastGeneratedContent: null,
  });

  return (
    <ChatContext.Provider value={{ conversationState, setConversationState }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
