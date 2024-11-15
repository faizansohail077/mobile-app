import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const AppVersion = () => {
    return (
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText1} >PTW Management Portal</Text>
            <Text style={styles.bottomText2}>v1.1.0</Text>
        </View>
    )
}

export default AppVersion

const styles = StyleSheet.create({
    bottomContainer: { flexDirection: 'column', gap: 2, alignItems: 'center' },
    bottomText1: { color: "rgba(117, 117, 117, 1)", fontWeight: 'bold', fontSize: widthPercentageToDP(3) },
    bottomText2: { color: "rgba(117, 117, 117, 1)", fontSize: widthPercentageToDP(3.5) },
})