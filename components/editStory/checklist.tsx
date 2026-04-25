import { Text, View } from 'react-native';
import ChecklistButton from './checklistButton';

type Props = {
    detectedTopics?: string[];
};

export default function Checklist({ detectedTopics = [] }: Props) {
    const topics = [
        'Nome do negócio',
        'Sua especialidade (produtos/serviços)',
        'Localização / Bairro',
        'Sua história ou o diferencial',
    ];

    return (
        <View className='gap-4'>
            <Text className='text-lg font-semibold'>Dicas para uma boa descrição</Text>
            {topics.map((topic) => (
                <ChecklistButton
                    key={topic}
                    text={topic}
                    check={detectedTopics.includes(topic)}
                />
            ))}
        </View>
    );
}
