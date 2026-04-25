import AudioBox from '@/components/editStory/audioBox';
import Checklist from '@/components/editStory/checklist';
import InputBox from '@/components/editStory/inputBox';
import ToggleWrite from '@/components/editStory/toggleWrite';
import { Container } from '@/components/general/container';
import GeneralButton from '@/components/general/generalButton';
import { Header } from '@/components/general/header';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { API_URL } from '@/constants/api';
const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function EditStory() {
  const [toggle, setToggle] = useState<'WRITE' | 'AUDIO'>('WRITE');
  const [text, setText] = useState('');
  const [audio, setAudio] = useState('');
  const [detectedTopics, setDetectedTopics] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      if (toggle === 'WRITE' && !text.trim()) {
        Alert.alert('Atenção', 'Digite uma história antes de continuar.');
        return;
      }

      if (toggle === 'AUDIO' && !audio) {
        Alert.alert('Atenção', 'Grave um áudio antes de continuar.');
        return;
      }

      setIsSaving(true);

      await axios.put(`${API_URL}/enterprises/${ENTERPRISE_ID}`, {
        historia: toggle === 'WRITE' ? text.trim() : audio,
      });

      setText('');
      setAudio('');
      setDetectedTopics([]);

      router.navigate('/(mybusiness)/manageImages');
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

        {toggle === 'WRITE' && <InputBox text={text} setText={setText} />}

        {toggle === 'AUDIO' && (
          <AudioBox
            audio={audio}
            setAudio={setAudio}
            setText={setText}
            setToggle={setToggle}
            setDetectedTopics={setDetectedTopics}
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
