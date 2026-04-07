import AudioBox from '@/components/editStory/audioBox';
import Checklist from '@/components/editStory/checklist';
import InputBox from '@/components/editStory/inputBox';
import ToggleWrite from '@/components/editStory/toggleWrite';
import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function EditStory() {
    const [toggle, setToggle] = useState<'WRITE' | 'AUDIO'>('WRITE')
    const [text, setText] = useState('')
    const [audio, setAudio] = useState('')
    
    return (
        <Container>
            <View className='gap-6'>
                <Header title="Editar História" showBackButton showNotificationButton />
                <Text className='pt-8 text-center text-lg font-semibold'>Conte sua história para nosso assistente, que vai resumir de uma forma objetiva e original.</Text>
                <ToggleWrite toggle={toggle} setToggle={setToggle}/>
                {toggle === 'WRITE' && 
                    <InputBox text={text} setText={setText}/>
                }
                {
                    toggle === 'AUDIO' &&
                        <AudioBox audio={audio} setAudio={setAudio}/>
                }
                <Checklist/>
            </View>
        </Container>
  );
}
