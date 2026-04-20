import { FeedbackItem } from '@/types/FeedbackItem'
import { View } from 'react-native'
import { CardItemFeedback } from './CardItemFeedback'
export const PositiveFeedbackList = ({ handlePress }: { handlePress: () => void }) => {

    const feedbacks: FeedbackItem[] = [
        {
            id: '1',
            text: 'Seu estabelecimento recebeu avaliações positivas com média de 4.8 estrelas este mês.',
            changes: '',
            automaticChanges: false,
        },
        {
            id: '2',
            text: 'A sopa de feijão foi o prato mais pedido do seu estabelecimento, somando 145 pedidos neste mês. Isso representa um aumento de 18% em comparação ao mês anterior.',
            changes: 'Vou destacar a sopa como prato principal no seu cardápio.',
            automaticChanges: true,
        },
        {
            id: '3',
            text: 'Seu tempo médio de entrega reduziu para 28 minutos, melhorando a experiência dos clientes.',
            changes: 'Vou destacar sua agilidade como diferencial no app.',
            automaticChanges: true,
        },
    ]
    return (
        <View className="gap-8 mt-10">
            {feedbacks.map(item => (
                <CardItemFeedback
                    key={item.id}
                    handlePress={handlePress}
                    icon={'analytics'}
                    text={item.text}
                    chages={item.changes}
                    automaticChanges={item.automaticChanges}
                    typeCard='positive'
                />
            ))}
        </View>
    )
}