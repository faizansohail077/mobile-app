import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Components } from '@/components';
import { getData } from '@/lib/helpers';
import { user_role } from '@/constants/user';
import { ReportViewModal, TypingModal } from '@/components/Modal';

const Profile = () => {
    const router: Router = useRouter();
    const [user, setUser] = useState<any>({})
    const [loader, setLoader] = useState(true)
    const [feedBackModal, setFeedBackModal] = useState(false)
    const [feedBackSuccessModal, setFeedBackSuccessModal] = useState(false)


    const rejected = () => {
        setFeedBackSuccessModal(false)
    }


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
                    <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/' })} name="left" size={24} color="black" />
                    <Text style={styles.headerText}>View Profile</Text>
                    <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
                </View>
            </View>

            <ScrollView style={{ paddingTop: heightPercentageToDP(2) }} >
                <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>

                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>Account Details</Text>
                        <MaterialCommunityIcons onPress={() => router.push({ 'pathname': '/(tabs)/editProfile' })} name="pencil" size={24} color="rgba(0, 0, 0, 0.56)" />
                    </View>

                    <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(2) }]} >
                        <Text style={styles.keyText}>User ID: </Text>
                        <Text style={styles.valueText}>leslielimahkao</Text>
                    </View>


                    <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                        <Text style={styles.keyText}>Email: </Text>
                        <Text style={styles.valueText}>leslielimahkao@jupiter.com</Text>
                    </View>

                    <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                        <Text style={styles.keyText}>Full Name: </Text>
                        <Text style={styles.valueText}>Leslie Lim Ah Kao</Text>
                    </View>

                    <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                        <Text style={styles.keyText}>Phone number: </Text>
                        <Text style={styles.valueText}>9144 4178</Text>
                    </View>

                    <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                        <Text style={styles.keyText}>Date Of Birth: </Text>
                        <Text style={styles.valueText}>22 Jan 2000</Text>
                    </View>


                </View>

                <View style={styles.navigationTopContainer}>
                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>Account Related</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push({ 'pathname': '/(tabs)/changePassword' })} activeOpacity={0.7} style={styles.navigationContainer} >
                        <Text style={{ color: Colors.primary_blue }}>{`Change Password`.toUpperCase()}</Text>
                        <AntDesign name="right" size={16} color={Colors.primary_blue} />
                    </TouchableOpacity>
                </View>

                {user.role === user_role["Admin"] && <View style={styles.navigationTopContainer}>
                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>User Related</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push({ 'pathname': '/(tabs)/userSettings' })} activeOpacity={0.7} style={styles.navigationContainer} >
                        <Text style={{ color: Colors.primary_blue }}>{`User Settings`.toUpperCase()}</Text>
                        <AntDesign name="right" size={16} color={Colors.primary_blue} />
                    </TouchableOpacity>
                </View>
                }

                <View style={styles.navigationTopContainer}>

                    <View style={styles.flexContainer} >
                        <Text style={styles.headerText}>Company Related</Text>
                    </View>

                    {companyRelated?.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => index === 3 && setFeedBackModal(true)} key={index} activeOpacity={0.7} style={styles.navigationContainer} >
                                <Text style={{ color: Colors.primary_blue }}>{item?.text.toUpperCase()}</Text>
                                <AntDesign name="right" size={16} color={Colors.primary_blue} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={{ marginTop: heightPercentageToDP(5) }} >

                    <Components.AppVersion />
                </View>

            </ScrollView>

            <TypingModal showSubTitle={false} inputTitle={"Description"} title='Give Feedback' modalVisible={feedBackModal} setModalVisible={setFeedBackModal} successModalVisible={feedBackSuccessModal} setSuccessModalVisible={setFeedBackSuccessModal} />
            <ReportViewModal modalVisible={feedBackSuccessModal} setModalVisible={setFeedBackSuccessModal} title='Your Feedback has been Submitted' subTitle='' buttonTitle={`close`.toUpperCase()} cta={() => rejected()} />
        </>
    )
}

export default Profile

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
    flexContainer: { flexDirection: "row", gap: 5, alignItems: 'center', justifyContent: 'space-between' },
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
    navigationContainer: { marginTop: heightPercentageToDP(2), borderWidth: 1, borderColor: Colors.primary_blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(1.5) }
})