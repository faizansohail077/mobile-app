import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { Router, useRouter } from 'expo-router'

const DocumentCard = ({ title }: { title: string }) => {

    const router: Router = useRouter();
    return (
        <>
            <TouchableOpacity onPress={() => router.push({pathname:'/rejected'})} style={styles.container} activeOpacity={0.7}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >

                    <Text style={styles.idText} >{title}</Text>
                    <AntDesign name='right' size={18} color={Colors.primary_blue} />
                </View>
                <Text style={{ fontSize: widthPercentageToDP(3.5), color: Colors.light_black, lineHeight: heightPercentageToDP(2.5) }}>Description of document, limit it to a maximum of 2 lines.</Text>
                <Text style={{ textAlign: 'right', color: 'rgba(0,0,0,0.6)' }} >5 Feb 22 at 18:00</Text>
            </TouchableOpacity>

        </>
    )
}

export default DocumentCard

const styles = StyleSheet.create({
    container: { gap: heightPercentageToDP(2.5), paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', fontSize: widthPercentageToDP(4) },

})