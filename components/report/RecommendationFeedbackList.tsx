import { FeedbackItem } from '@/types/FeedbackItem'
import { View } from 'react-native'
import { CardItemFeedback } from './CardItemFeedback'

export const RecommendationFeedbackList = ({ handlePress }: { handlePress: () => void }) => {

    const feedbacks: FeedbackItem[] = [
        {
            id: '1',
            text: 'Adicionar combos promocionais pode aumentar o ticket médio dos pedidos.',
            changes: 'Vou criar sugestões de combos com seus pratos mais vendidos.',
            automaticChanges: true,
        },
        {
            id: '2',
            text: 'Investir em fotos mais atrativas dos pratos pode aumentar a conversão de pedidos.',
            changes: '',
            automaticChanges: false,
        },
        {
            id: '3',
            text: 'Expandir o horário de funcionamento pode atrair mais clientes no período da noite.',
            changes: 'Vou recomendar horários ideais com base na demanda.',
            automaticChanges: true,
        },
    ]

    return (
        <View className="gap-8 mt-10">
            {feedbacks.map(item => (
                <CardItemFeedback
                    key={item.id}
                    handlePress={handlePress}
                    icon={'bulb'}
                    text={item.text}
                    chages={item.changes}
                    automaticChanges={item.automaticChanges}
                    typeCard='recomendation'
                />
            ))}
        </View>
    )
}