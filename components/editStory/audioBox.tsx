import Ionicons from '@expo/vector-icons/Ionicons'
import * as FileSystem from 'expo-file-system/legacy'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'

import {
    RecordingPresets,
    requestRecordingPermissionsAsync,
    useAudioRecorder,
} from 'expo-audio'

type Props = {
    audio: string
    setAudio: (s: string) => void
    setText: (s: string) => void
    setToggle: (t: 'WRITE' | 'AUDIO') => void
}

const BASE_URL = 'https://mandaca-backend.onrender.com'
const USER_ID = '453df15b-61ce-4571-8bdb-cdbedf0ff041'

export default function AudioBox({ audio, setAudio, setText, setToggle }: Props) {

    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)

    const [loading, setLoading] = useState(false)

    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    const startRecording = async () => {
        try {
            const permission = await requestRecordingPermissionsAsync()

            if (!permission.granted) {
                alert('Permissão de microfone necessária!')
                return
            }

            await recorder.prepareToRecordAsync()
            recorder.record()

            scale.value = withRepeat(
                withTiming(1.2, { duration: 600 }),
                -1,
                true,
            )

        } catch (error) {
            console.error('Erro ao iniciar gravação:', error)
        }
    }

    const stopRecording = async () => {
        try {
            setLoading(true)

            await recorder.stop()

            const uri = recorder.uri

            scale.value = withTiming(1)

            if (!uri) return

            const result = await FileSystem.uploadAsync(
                `${BASE_URL}/transcriptions`,
                uri,
                {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'audio',
                    mimeType: 'audio/m4a',
                    parameters: {
                        usuario_id: USER_ID,
                    },
                },
            )

            if (result.status < 200 || result.status >= 300) {
                throw new Error(`HTTP ${result.status}: ${result.body}`)
            }

            const data = JSON.parse(result.body)
            const texto = data?.historia || ''

            setText(texto)
            setAudio(texto)
            setToggle('WRITE')

        } catch (error: any) {
            console.error('Erro ao enviar áudio:', error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='w-full rounded-xl px-4 py-3 h-60 gap-4 bg-white border border-black/15 items-center justify-center'>

            <Animated.View style={animatedStyle}>
                <Pressable
                    onPressIn={startRecording}
                    onPressOut={stopRecording}
                    className="h-28 w-28 bg-primary rounded-full justify-center items-center"
                >
                    <Ionicons name="mic" size={30} color="#FFFFFF" />
                </Pressable>
            </Animated.View>

            {loading ? (
                <Text className="text-primary font-semibold">
                    Processando áudio...
                </Text>
            ) : (
                <Text className="text-black/60 text-center">
                    {recorder.isRecording
                        ? 'Gravando... solte para enviar'
                        : audio
                        ? 'Áudio convertido com sucesso ✅'
                        : 'Toque e segure para gravar'}
                </Text>
            )}
        </View>
    )
}
