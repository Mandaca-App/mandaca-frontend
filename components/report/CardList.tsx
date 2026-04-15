import { router } from 'expo-router'
import { View } from 'react-native'
import { CardItem } from './cardItem'

export const CardList = ()=> {
    const handlePresPositive = ()=> {
        router.navigate('/(report)/positivePoints')
    }
    const handlePresNegative = ()=> {
        router.navigate('/(report)/negativePoints')
    }
    const handlePresRecomendation = ()=> {
        router.navigate('/(report)/recomandations')
    }
    return(
        <View className="mt-10 gap-8">
            <CardItem
                icon={'checkbox'}
                topics={[
                    {id:1, text:'a sopa está boa'}, 
                    {id: 2, text:'parabéns pela salada'}]}
                typeCard="positive"
                handlePress={handlePresPositive}
            />
            <CardItem
                icon={'remove-circle'}
                topics={[
                    {id:1, text:'o feijão está ruim'}, 
                    {id: 2, text:'suco com muito açucar'}, 
                    {id: 3, text:'café muito forte'},
                ]}
                typeCard="negative"
                handlePress={handlePresNegative}
            />
            <CardItem
                icon={'add-circle'}
                topics={[
                    {id:1, text:'Data festiva próxima, sugiro adicionar comidas típicas'},
                ]}
                typeCard="recomendation"
                handlePress={handlePresRecomendation}
            />
        </View>
    )
}