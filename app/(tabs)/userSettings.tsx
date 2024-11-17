import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { Components } from '@/components';
import { users } from '@/constants/user';
import { ReportViewModal, AddUserModal } from '@/components/Modal';

const UserSettings = () => {
    const router: Router = useRouter();
    const [userList, setUserList] = useState<any>(users)

    const [openAddUserModal, setAddUserModal] = useState(false)
    const [openSuccessModal, setSuccessModal] = useState(false)

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')

    const userCreated = () => {
        setUserList((prevUserList: any) => [
            { email, password, role },
            ...prevUserList,
        ]);

        setEmail('');
        setPassword('');
        setRole('');

        setSuccessModal(false);

    };


    return (
        <>
            <View style={styles.topContainer} >
                <View style={styles.topSubContainer} >
                    <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/profile' })} name="left" size={24} color="black" />
                    <Text style={styles.headerText}>User Settings</Text>
                    <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ height: heightPercentageToDP(80), paddingTop: heightPercentageToDP(2) }} >
                <View >
                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>Users</Text>
                    </View>

                    {userList?.map((item: any, index: number) => {
                        return (
                            <View key={index} style={[styles.navigationTopContainer, { gap: 10 }]}>
                                <View style={{ flexDirection: 'row', gap: 5 }} >
                                    <Text style={styles.key}>Email: </Text>
                                    <Text style={styles.value}>{item.email}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 5 }} >
                                    <Text style={styles.key}>Role: </Text>
                                    <Text style={styles.value}>{item.role}</Text>
                                </View>
                            </View>
                        )
                    })}


                </View>
            </ScrollView>

            <View style={styles.navigationTopContainer}>
                <Components.Button title="Add User" onPress={() => setAddUserModal(true)} />
            </View>

            <AddUserModal email={email} setEmail={setEmail} password={password} setPassword={setPassword} role={role} setRole={setRole} modalVisible={openAddUserModal} setModalVisible={setAddUserModal} successModalVisible={openSuccessModal} setSuccessModalVisible={setSuccessModal} />
            <ReportViewModal modalVisible={openSuccessModal} setModalVisible={setSuccessModal} title='User Has Been Created' subTitle='Go back home to view all other PTWs that are pending action.' buttonTitle={`go back to profile`.toUpperCase()} cta={() => userCreated()} />
        </>
    )
}

export default UserSettings

const styles = StyleSheet.create({
    topContainer: {
        height: heightPercentageToDP(10),
        justifyContent: 'flex-end',
        backgroundColor: Colors.white,
        paddingBottom: 10
    },
    topSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(5)
    },
    headerText: {
        fontSize: widthPercentageToDP(4.5),
        fontWeight: 'bold'
    },
    flexContainer: {
        paddingHorizontal: widthPercentageToDP(5),
        flexDirection: "row", gap: 5, alignItems: 'center', justifyContent: 'space-between'
    },
    keyText: {
        fontSize: widthPercentageToDP(3.5),
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.6)'
    },
    valueText: {
        fontSize: widthPercentageToDP(3.5),
        color: 'rgba(0, 0, 0, 0.6)'
    },
    navigationTopContainer: { marginTop: heightPercentageToDP(2), backgroundColor: Colors.white, paddingVertical: heightPercentageToDP(2), paddingHorizontal: widthPercentageToDP(5) },
    navigationContainer: { borderWidth: 1, borderColor: Colors.primary_blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(1.5) },
    key: { fontWeight: "700", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(4) },
    value: { fontWeight: "400", color: "rgba(0, 0, 0, 0.6)", fontSize: widthPercentageToDP(4) }
})