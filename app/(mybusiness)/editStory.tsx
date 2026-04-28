import AudioBox from '@/components/editStory/audioBox';
import Checklist from '@/components/editStory/checklist';
import InputBox from '@/components/editStory/inputBox';
import ToggleWrite from '@/components/editStory/toggleWrite';
import { Container } from '@/components/general/container';
import GeneralButton from '@/components/general/generalButton';
import { Header } from '@/components/general/header';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { storySchema } from '@/schemas/storySchema';
import {
  getEnterprise,
  updateEnterpriseStory,
} from '@/services/enterpriseStory';
import { Enterprise } from '@/types/enterprise';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function EditStory() {
  const [toggle, setToggle] = useState<'WRITE' | 'AUDIO'>('WRITE');
  const [text, setText] = useState('');
  const [audio, setAudio] = useState('');
  const [detectedTopics, setDetectedTopics] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [error, setError] = useState<string | undefined>();

  const mapEnterpriseToTopics = (enterprise: Enterprise): string[] => {
    const topics: string[] = [];

    if (enterprise) {
      topics.push('Nome do negócio');
    }

    if (enterprise.especialidade) {
      topics.push('Sua especialidade (produtos/serviços)');
    }

    if (enterprise.endereco) {
      topics.push('Localização / Bairro');
    }

    if (enterprise.historia) {
      topics.push('Sua história ou o diferencial');
    }

    return topics;
  };

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const data = await getEnterprise(ENTERPRISE_ID);

        setEnterprise(data);

        if (data.historia) {
          setText(data.historia);
          setToggle('WRITE');
        }

        const topics = mapEnterpriseToTopics(data);
        setDetectedTopics(topics);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(enterprise);
    fetchEnterprise();
  }, []);

  const handleSave = async () => {
    try {
      if (toggle === 'WRITE') {
        const result = storySchema.safeParse({
          historia: text.trim(),
        });

        if (!result.success) {
          const message = result.error.issues[0].message;
          setError(message);
          return;
        }

        setError(undefined);
      }

      if (toggle === 'AUDIO' && !audio) {
        Alert.alert('Atenção', 'Grave um áudio antes de continuar.');
        return;
      }

      setIsSaving(true);

      await updateEnterpriseStory(
        ENTERPRISE_ID,
        toggle === 'WRITE' ? text.trim() : audio,
      );

      const updatedData = await getEnterprise(ENTERPRISE_ID);

      setEnterprise(updatedData);

      const topics = mapEnterpriseToTopics(updatedData);
      setDetectedTopics(topics);

      setText(updatedData.historia || '');
      setAudio('');

      router.push('/(mybusiness)/manageImages');
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Não foi possível salvar a história. Tente novamente.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container>
      <View className="gap-6">
        <Header title="Editar História" showBackButton showNotificationButton />

        <Text className="pt-8 text-center text-lg font-semibold">
          Conte a história do seu restaurante.
        </Text>

        <ToggleWrite toggle={toggle} setToggle={setToggle} />

        {toggle === 'WRITE' && (
          <InputBox text={text} setText={setText} error={error} />
        )}

        {toggle === 'AUDIO' && (
          <AudioBox
            setText={setText}
            setToggle={setToggle}
          />
        )}

        <Checklist detectedTopics={detectedTopics} />

        <GeneralButton
          text={isSaving ? 'Salvando...' : 'Salvar'}
          handlePress={handleSave}
          disabled={isSaving}
        />
      </View>
    </Container>
  );
}
