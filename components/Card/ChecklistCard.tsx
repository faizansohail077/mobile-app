import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { Router, useRouter } from 'expo-router'

const ChecklistCard = () => {

    const router: Router = useRouter()

    return (
        <>
            <TouchableOpacity onPress={() => router.push({ pathname: '/rejected' })} style={styles.container} activeOpacity={0.7}>
                <Text style={styles.idText} >Complete Monthly Checklist</Text>
                <Text style={{ color: Colors.light_black }}>This is a reminder for you to complete the monthly checklist.</Text>
                <Text style={{ textAlign: 'right', color: 'rgba(0,0,0,0.6)' }} >5 Feb 22 at 18:00</Text>
            </TouchableOpacity>

        </>
    )
}

export default ChecklistCard

const styles = StyleSheet.create({
    container: { gap: heightPercentageToDP(2.5), paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', fontSize: widthPercentageToDP(4) },

})