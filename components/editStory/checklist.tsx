import { Text, View } from 'react-native';
import ChecklistButton from './checklistButton';

export default function Checklist() {
  return (
    <View className="gap-4">
      <Text className="text-lg font-semibold">
        Dicas para uma boa descrição
      </Text>
      <ChecklistButton text="Nome do negócio" check={true} />
      <ChecklistButton
        text="Sua especialidade (produtos/serviços)"
        check={true}
      />
      <ChecklistButton text="Localização / Bairro" check={false} />
      <ChecklistButton text="Sua história ou o diferencial" check={false} />
    </View>
  );
}
