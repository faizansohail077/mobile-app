import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { Components } from '@/components'
import { AcknowlegedSuccessModal, AskToAcknowlegedeModal } from '@/components/Modal'
import { Router, useRouter } from 'expo-router'

const MemoCard = () => {
    const router: Router = useRouter()

    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [askModalVisible, setAskModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => router.push({ pathname: '/rejected' })} style={styles.container} activeOpacity={0.7}>
                <Text style={styles.idText} >Memo by Management</Text>
                <Text style={{ color: Colors.dark_red }} >You are required to acknowledge this memorandum.</Text>
                <Text style={{ color: Colors.light_black }}>2nd of August is a Public Holiday. Do take note of this.</Text>
                <Text style={{ color: Colors.primary_blue }} >{`view pdf document`.toUpperCase()}</Text>
                <Text style={{ textAlign: 'right', color: 'rgba(0,0,0,0.6)' }} >5 Feb 22 at 18:00</Text>
                <Components.Button onPress={() => setAskModalVisible(true)}
                    buttonContainerStyle={{ height: heightPercentageToDP(4) }} title="Acknowledge" />
            </TouchableOpacity>
            <AskToAcknowlegedeModal modalVisible={askModalVisible} setModalVisible={setAskModalVisible} successModalVisible={successModalVisible} setSuccessModalVisible={setSuccessModalVisible} />
            <AcknowlegedSuccessModal modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible} />

        </>
    )
}

export default MemoCard

const styles = StyleSheet.create({
    container: { gap: heightPercentageToDP(2.5), paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', fontSize: widthPercentageToDP(4) },

})