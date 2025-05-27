import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';


export default function CardapioScreen() {

  return (
    <LinearGradient 
        colors={['#4ade80', '#14b8a6']}
        className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Cabeçalho */}
        <View className="items-end">
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={30} color="black" />
            <Text className="text-xs font-poppins">Meu perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text className="text-4xl font-poppinsBold text-center text-white mt-4">
          Encontre opções para suas refeições diárias
        </Text>

        <Text className="text-3xl font-poppinsSemiBold text-center text-white mt-10 mb-4">
          Seu cardápio personalizado
        </Text>

        {/* Grade de botões */}
        <View className="flex-row flex-wrap justify-between gap-6 mt-4">
          {[
            { label: 'Café da manhã', icon: 'cafe-outline' },
            { label: 'Almoço', icon: 'restaurant-outline' },
            { label: 'Lanches', icon: 'fast-food-outline' },
            { label: 'Janta', icon: 'wine-outline' },
          ].map((item, index) => (
            <TouchableOpacity style={{
                backgroundColor: '#D9D9D9',
            }}
              key={index}
              className="w-[48%] h-40 rounded-lg justify-center items-center shadow"
            >
              <Ionicons name={item.icon} size={55} color="#000" />
              <Text className="mt-2 font-medium font-poppins">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão Personalizar */}
        <TouchableOpacity className="p-4 mt-10 rounded-lg flex-row items-center justify-center shadow" style={{backgroundColor:'#D9D9D9'}}>
          <MaterialIcons name="edit" size={30} color="black" />
          <Text className="ml-2 font-medium font-poppins">Personalizar refeições</Text>
        </TouchableOpacity>

        {/* Botão Mudar preferências */}
        <TouchableOpacity className=" p-4 mt-4 rounded-lg flex-row items-center justify-center shadow" style={{backgroundColor:'#D9D9D9'}}> 
          <Ionicons name="person-outline" size={30} color="black" />
          <Text className="ml-2 font-medium font-poppins">
            Mudar intolerâncias ou preferências
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navegação inferior */}
      <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-200">
        {[
          { icon: 'home-outline', label: 'Home' },
          { icon: 'restaurant-outline', label: 'Cardápio' },
          { icon: 'book-outline', label: 'Receitas' },
          { icon: 'newspaper-outline', label: 'Notícias' },
        ].map((item, index) => (
          <TouchableOpacity key={index} className="items-center">
            <Ionicons name={item.icon} size={24} color="black" />
            <Text className="text-xs">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}