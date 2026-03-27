import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const Header = ()=> {
    
    const userName = 'Maria da Silva'; // requisição para receber nome do usuário

    return(
        <View className="flex flex-row justify-between">
            <Pressable 
                className="h-10 w-10 bg-dark rounded-full justify-center items-center"
                style={style.cardShadow}
                onPress={()=> router.navigate('/profile')} 
            >
                <Text className="text-light text-xl">
                    M
                </Text>
            </Pressable>

            <View className="flex-col">
                <Text className="text-lg text-center">
                    Bem-vinda de volta,
                </Text>
                <Text className="font-semibold text-center text-lg">
                    {userName}
                </Text>
            </View>

            <Pressable
                className="h-10 w-10 bg-light rounded-full justify-center items-center"
                style={style.cardShadow}
                onPress={()=> router.navigate('/notifications')}
            >
                <Ionicons name="notifications" size={24} color="#2C2C2C" />
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 3.80,

                elevation: 5,
    },
});