import { View } from "react-native";
import ToggleWriteButton from "./toggleWriteButton";

type Props = {
    toggle: 'WRITE' | 'AUDIO'
    setToggle: (s: 'WRITE' | 'AUDIO')=> void 
}
export default function ToggleWrite ({toggle, setToggle}: Props) {
    return(
        <View className='flex-row justify-center bg-secondary rounded-full p-1'>
            <ToggleWriteButton 
                text='Escrever'
                tag='WRITE'
                toggle={toggle} 
                handlePress={()=> setToggle('WRITE')}
            />
            <ToggleWriteButton 
                text='Gravar Áudio'
                tag='AUDIO' 
                toggle={toggle} 
                handlePress={()=> setToggle("AUDIO")}
            />
        </View>
    )
}