import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SvgXml } from 'react-native-svg'
import { Images } from '@/assets/images'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'

const Input = ({ value, setValue, title, placeholder, icon = false, onIconPress, showPassword = false }: { value: string, setValue: any, showPassword?: boolean, title: string, placeholder: string, icon?: boolean, onIconPress?: () => void }) => {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        inputRef.current?.focus();
    };
    
    return (
        <TouchableOpacity activeOpacity={1} onPress={handleFocus} style={styles.inputContainer} >
            <Text style={[styles.inputTitle, { color: isFocused ? Colors.primary_blue : "rgba(0, 0, 0, 0.6)" }]}>{title}</Text>
            <View style={[styles.inputFieldContainer, { borderBottomColor: isFocused ? Colors.primary_blue : 'rgba(0, 0, 0, 0.42)' }]} >
                <TextInput
                    value={value}
                    onChangeText={(e) => setValue(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={inputRef}
                    autoCapitalize='none'
                    secureTextEntry={showPassword}
                    placeholderTextColor={isFocused ? Colors.primary_blue : "rgba(0, 0, 0, 0.38)"}
                    placeholder={isFocused ? "" : placeholder} style={styles.inputField} />
                {icon && <TouchableOpacity onPress={onIconPress} >
                    <SvgXml xml={Images.eye()} />
                </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: { flexDirection: 'column', gap: 5 },
    inputTitle: { fontSize: widthPercentageToDP(3.5) },
    inputFieldContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5, borderBottomWidth: 1 },
    inputField: { width: "90%", fontSize: widthPercentageToDP(4), color: 'black' }
})