import { View } from 'react-native'
import { CardItemSkeleton } from './cardItemSkeleton'

export const CardListSkeleton = () => {
    return (
        <View className="mt-10 gap-8">
            <CardItemSkeleton />
            <CardItemSkeleton />
            <CardItemSkeleton />
        </View>
    )
}