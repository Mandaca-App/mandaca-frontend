import { View } from 'react-native'
import { CardItemFeedback } from './CardItemFeedback'

type FeedbackItem = {
    id: string
    text: string
    changes: string
    automaticChanges: boolean
}

export const NegativeFeedbackList = ({ handlePress }: { handlePress: () => void }) => {

    const feedbacks: FeedbackItem[] = [
        {
            id: '1',
            text: 'O tempo médio de entrega aumentou para 52 minutos neste mês, impactando negativamente a experiência dos clientes.',
            changes: 'Vou sugerir ajustes na logística de entregas para reduzir o tempo.',
            automaticChanges: true,
        },
        {
            id: '2',
            text: 'Houve um aumento de 25% nas avaliações negativas relacionadas à temperatura dos alimentos.',
            changes: 'Vou recomendar melhorias na embalagem térmica.',
            automaticChanges: true,
        },
        {
            id: '3',
            text: 'A taxa de cancelamento de pedidos subiu para 12%, acima da média esperada.',
            changes: '',
            automaticChanges: false,
        },
    ]

    return (
        <View className="gap-8 mt-10">
            {feedbacks.map(item => (
                <CardItemFeedback
                    key={item.id}
                    handlePress={handlePress}
                    icon={'warning'}
                    text={item.text}
                    chages={item.changes}
                    automaticChanges={item.automaticChanges}
                    typeCard='negative'
                />
            ))}
        </View>
    )
}