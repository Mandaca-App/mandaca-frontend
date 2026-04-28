import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FileUpload from './fileUpload';
import ImageItem from './imageItem';

import { deleteImage, getImagesByEnterprise, uploadImage } from '@/services/imagesEnterprise';
import { ImageEnterprise } from '@/types/imageEnterprise';

type ImageType = {
    id: string;
    uri: string;
};

export default function ImagesList() {
    const [images, setImages] = useState<ImageType[]>([]);

    const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

    const loadImages = async () => {
        try {
            const data: ImageEnterprise[] = await getImagesByEnterprise(ENTERPRISE_ID);

            const formattedImages: ImageType[] = data.map((item) => ({
                id: item.id_foto,
                uri: item.url_foto_empresa,
            }));

            setImages(formattedImages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    async function handleDelete(id: string) {
        try {
            await deleteImage(id);
            loadImages();
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
        }
    }

    async function handleReplace(newUri: string) {
        try {
            await uploadImage(newUri, ENTERPRISE_ID);
            loadImages();
        } catch (error) {
            console.error('Erro ao substituir imagem:', error);
        }
    }

    return (
        <View>
            <FileUpload onUploadSuccess={loadImages} />

            <Text className='text-lg font-semibold mb-4'>
                Imagens cadastradas
            </Text>

            {images.map((img) => (
                <ImageItem
                    key={img.id}
                    id={img.id}
                    uri={img.uri}
                    onDelete={() => handleDelete(img.id)}
                    onReplace={handleReplace}
                />
            ))}
        </View>
    );
}