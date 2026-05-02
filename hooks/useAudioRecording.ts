import { API_URL } from '@/constants/api';
import {
    RecordingPresets,
    requestRecordingPermissionsAsync,
    useAudioRecorder,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { useState } from 'react';

const USER_ID = '453df15b-61ce-4571-8bdb-cdbedf0ff041';

export const useAudioRecording = () => {
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startRecording = async () => {
        try {
            setError(null);
            const permission = await requestRecordingPermissionsAsync();

            if (!permission.granted) {
                setError('Permissão de microfone necessária!');
                return false;
            }

            await recorder.prepareToRecordAsync();
            recorder.record();
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao iniciar gravação';
            setError(message);
            console.error('Erro ao iniciar gravação:', err);
            return false;
        }
    };

    const stopRecording = async (): Promise<string | null> => {
        try {
            setIsLoading(true);
            setError(null);

            await recorder.stop();
            const uri = recorder.uri;

            if (!uri) {
                setError('Falha ao processar áudio gravado');
                return null;
            }

            const extension = uri.split('.').pop()?.toLowerCase() ?? 'm4a';
            const mimeTypeMap: Record<string, string> = {
                m4a: 'audio/mp4',
                mp4: 'audio/mp4',
                mp3: 'audio/mpeg',
                '3gp': 'audio/3gpp',
                aac: 'audio/aac',
                wav: 'audio/wav',
            };
            const mimeType = mimeTypeMap[extension] ?? 'audio/mp4';

            const result = await FileSystem.uploadAsync(
                `${API_URL}/transcriptions/`,
                uri,
                {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'audio',
                    mimeType,
                    parameters: {
                        usuario_id: USER_ID,
                    },
                },
            );

            if (result.status < 200 || result.status >= 300) {
                throw new Error(`HTTP ${result.status}: ${result.body}`);
            }

            const data = JSON.parse(result.body);
            const texto = data?.texto || '';

            return texto;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao transcrever áudio';
            setError(message);
            console.error('Erro ao enviar áudio:', err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recorder,
        isRecording: recorder.isRecording,
        isLoading,
        error,
        startRecording,
        stopRecording,
    };
};
