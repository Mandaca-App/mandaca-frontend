import { useState } from 'react';
import { Text, View } from 'react-native';
import ImageItem from './imageItem';

type ImageType = {
    id: string;
    uri: string;
};

export default function ImagesList() {
    const [images, setImages] = useState<ImageType[]>([
        { id: '1', uri: 'https://picsum.photos/id/1018/800/400' },
        { id: '2', uri: 'https://picsum.photos/id/1015/800/400' },
        { id: '3', uri: 'https://picsum.photos/id/1019/800/400' },
        { id: '4', uri: 'https://picsum.photos/id/1020/800/400' },
        { id: '5', uri: 'https://picsum.photos/id/1024/800/400' },
    ]);

    // DELETE (simulando API)
    function handleDelete(id: string) {
        setImages(prev => prev.filter(img => img.id !== id));
    }

    // UPDATE / REPLACE (simulando API)
    function handleReplace(id: string) {
        const newImage = `https://picsum.photos/800/400?random=${Math.random()}`;

        setImages(prev =>
            prev.map(img =>
                img.id === id ? { ...img, uri: newImage } : img,
            ),
        );
    }

    return (
        <View>
            <Text className='text-lg font-semibold mb-4'>
                Imagens cadastradas
            </Text>
            {images.map((img) => (
                <ImageItem
                    key={img.id}
                    id={img.id}
                    uri={img.uri}
                    onDelete={() => handleDelete(img.id)}
                    onReplace={() => handleReplace(img.id)}
                />
            ))}
        </View>
    );
}