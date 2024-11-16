import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'

const NotificationReportCard = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            <Text style={styles.idText} >{'PTW 415929374-1234'}</Text>
            <View style={styles.tagContainer} >
                {[{ text: "Rejected", color: Colors.dark_blue }, { text: "Hot Work", color: Colors.purple }].map((tag: { text: string, color: string }, index: number) => {
                    return (
                        <View key={index} style={[styles.tagBox, { backgroundColor: tag.color, }]} >
                            <Text style={{ fontWeight: '500', color: tag.color === Colors.light_grey ? Colors.light_black : Colors.white }} >
                                {tag.text}
                            </Text>
                        </View>
                    )
                })}
            </View>

            <View style={{ gap: 5 }} >
                <Text style={styles.key} >Reason for rejection:</Text>
                <Text style={styles.value}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                <Text style={{ textAlign: 'right',color:'rgba(0, 0, 0, 0.6)' }}>8 Feb 22 at 18:00</Text>
            </View>

        </TouchableOpacity>
    )
}

export default NotificationReportCard

const styles = StyleSheet.create({
    container: { gap: 10, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', fontSize: widthPercentageToDP(4) },
    tagContainer: { flexDirection: "row", gap: 5, alignItems: 'center' },
    tagBox: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 100, },
    key: { fontWeight: "700", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(3.5) },
    value: { fontWeight: "400", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(3.5),lineHeight:widthPercentageToDP(5.5) }
})