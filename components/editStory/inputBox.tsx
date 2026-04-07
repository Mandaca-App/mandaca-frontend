import { useState } from 'react'
import { TextInput, View } from 'react-native'

type Props = {
    text: string,
    setText: (s: string) => void
}

export default function InputBox({ text, setText }: Props) {

    const [isFocused, setIsFocused] = useState(false)

    return (
        <View
            className={`
                w-full rounded-xl px-4 py-3 h-60 bg-white border
                ${isFocused ? 'border-black' : 'border-black/15'}
            `}
        >
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Digite a história do seu restaurante..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="text-base text-black"
            />
        </View>
    )
}