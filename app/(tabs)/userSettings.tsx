import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Components } from '@/components';
import { getData } from '@/lib/helpers';
import { user_role, users } from '@/constants/user';

const UserSettings = () => {
    const router: Router = useRouter();
    const [user, setUser] = useState<any>({})
    const [loader, setLoader] = useState(true)
    const [userList, setUserList] = useState(users)


    const companyRelated = [
        { text: "about us", goTo: "" },
        { text: "terms & conditions", goTo: "" },
        { text: "privacy policy", goTo: "" },
        { text: "GIVE FEEDBACK", goTo: "" },
    ]

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const result = await getData('user');
            setUser(result)
        } catch (error) {
            console.log(error, 'error fetchUser')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Text>Loading...</Text>

    return (
        <>
            <View style={styles.topContainer} >
                <View style={styles.topSubContainer} >
                    <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/profile' })} name="left" size={24} color="black" />
                    <Text style={styles.headerText}>User Settings</Text>
                    <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
                </View>
            </View>

            <ScrollView style={{ height: heightPercentageToDP(80), paddingTop: heightPercentageToDP(2) }} >
                <View >
                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>Users</Text>
                    </View>

                    {userList?.map((item) => {
                        return (
                            <View style={[styles.navigationTopContainer,{gap:10}]}>
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

                <Components.Button title="Add User" onPress={() => router.push({ 'pathname': '/login' })} />
            </View>
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