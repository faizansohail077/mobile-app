import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { report_types } from '@/constants/user'
import { Router, useRouter } from 'expo-router'

const ReportCard = ({ data, type }: { data: any, type: string }) => {

    const router: Router = useRouter()

    return (

        <TouchableOpacity onPress={() => { data.navigate && router.push({ pathname: data.navigate }) }} style={styles.container} activeOpacity={0.7}>
            <Text style={styles.idText} >{data?.id}</Text>
            <View style={styles.tagContainer} >
                {data?.tags.map((tag: { text: string, color: string }, index: number) => {
                    return (
                        <View key={index} style={[styles.tagBox, { backgroundColor: tag.color, }]} >
                            <Text style={{ fontWeight: '500', color: tag.color === Colors.light_grey ? Colors.light_black : Colors.white }} >
                                {tag.text}
                            </Text>
                        </View>
                    )
                })}
            </View>

            {type === report_types["reports"] ? (
                <View style={{ flexDirection: 'row', gap: 5 }} >
                    <Text style={styles.key} >Submitted</Text>
                    <Text style={styles.value}>{data.Submitted}</Text>
                </View>
            ) : (
                <View style={{ gap: 5, marginTop: 5 }} >
                    <View style={{ flexDirection: 'row', gap: 5 }} >
                        <Text style={styles.key}>Issued</Text>
                        <Text style={styles.value}>{data?.Issued}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5 }} >
                        <Text style={styles.key}>Expiry</Text>
                        <Text style={styles.value}>{data?.Expiry}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5 }} >
                        <Text style={styles.key}>Location</Text>
                        <Text style={styles.value}>{data?.Location}</Text>
                    </View>
                </View>
            )}


        </TouchableOpacity>
    )
}

export default ReportCard

const styles = StyleSheet.create({
    container: { gap: 10, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', fontSize: widthPercentageToDP(4) },
    tagContainer: { flexDirection: "row", gap: 5, alignItems: 'center' },
    tagBox: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 100, },
    key: { fontWeight: "700", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(4) },
    value: { fontWeight: "400", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(4) }
})