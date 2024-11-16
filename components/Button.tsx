import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'

const ButtonComponent = ({ buttonContainerStyle, disabled, title, onPress }: { buttonContainerStyle?: any, onPress?: () => void, title: string, disabled?: boolean }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8} style={[styles.buttonContainer, buttonContainerStyle,{ backgroundColor: disabled ? Colors.disabled : Colors.primary_blue }]} >
            <Text style={[styles.buttonContainerText, { color: disabled ? "rgba(0, 0, 0, 0.38)" : "white" }]} >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    buttonContainer: { borderRadius: widthPercentageToDP(1), alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(5), width: "100%" },
    buttonContainerText: { fontWeight: '500', fontSize: widthPercentageToDP(4) }
})