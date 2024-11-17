import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from ".";
import { useEffect, useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import { Colors } from "@/constants/Colors";
import { getData } from "@/lib/helpers";
import { user_role } from "@/constants/user";
import { Router, useRouter } from "expo-router";

const permissions = [
    {
        role: user_role["Supervisor"], permission: [
            { text: "Communication Record", goTo: '/createCommunicationReport' },
            { text: "Permit To Work", goTo: '/createPTW' },
            { text: "Incident Reporting", goTo: '/createIncidentReport' },
        ]
    },
    {
        role: user_role["Safety-Assessor"], permission: [
            { text: "Permit To Work", goTo: '/createPTW' },
            { text: "HSE Inspection", goTo: '/createHSEInspection' },
            { text: "Incident Reporting", goTo: '/createIncidentReport' },

        ]
    },
    {
        role: user_role["Project-Manager"], permission: [
            { text: "Incident Reporting", goTo: '/createIncidentReport' },
        ]
    },
    {
        role: user_role["Admin"], permission: [
            { text: "Communication Record", goTo: '/createCommunicationReport' },
            { text: "Permit To Work", goTo: '/createPTW' },
            { text: "Incident Reporting", goTo: '/createIncidentReport' },
            { text: "HSE Inspection", goTo: '/createHSEInspection' },
            { text: "Incident Reporting", goTo: '/createIncidentReport' },
        ]
    },

]

const tabs = [
    {
        role: user_role["Supervisor"], tabs: [
            { heading: "Frequently used", subTabs: ["Daily Checklist", "Permit To Work", "Communication Record"] },
            { heading: "Others", subTabs: ["Monthly Checklist", "Incident Reporting", "MS, RA and SWP"] },
        ]
    },
    {
        role: user_role["Safety-Assessor"], tabs: [
            { heading: "Frequently used", subTabs: ["Permit To Work", "HSE Inspection"] },
            { heading: "Others", subTabs: ["Incident Reporting", "MS, RA and SWP"] },
        ]
    },

    {
        role: user_role["Project-Manager"], tabs: [
            { heading: "Others", subTabs: ["Incident Reporting"] },
        ]
    },
    {
        role: user_role["Admin"], tabs: [
            { heading: "Frequently used", subTabs: ["Daily Checklist", "Permit To Work", "Communication Record","HSE Inspection"] },
            { heading: "Others", subTabs: ["Monthly Checklist", "Incident Reporting", "MS, RA and SWP"] },
        ]
    },


]

export default function CreateReportModalComponent({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) {

    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const router: Router = useRouter()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetchUser()
    }, [])


    const submit = () => {
        if (!selectedRadio) {
            Alert.alert("Please select a report type");
            return;
        }

        const userPermissions = permissions.find((perm) => perm.role === user.role);

        if (!userPermissions) {
            Alert.alert("You are not allowed to perform any actions");
            return;
        }

        const allowedPermission: any = userPermissions.permission.find(
            (item) => item.text === selectedRadio
        );

        if (allowedPermission) {
            console.log(allowedPermission, 'allowedPermission')
            router.push({ pathname: allowedPermission.goTo })
            setModalVisible(!modalVisible);
        } else {
            Alert.alert("You are not allowed to perform this action");
        }
    };

    const handleSelect = (option: string) => {
        setSelectedRadio((prev) => (prev === option ? null : option));
    };

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const result = await getData('user');
            if (result) {
                setUser(result)
            } else {
                console.log('no user found')
            }
        } catch (error) {
            console.log(error, 'error fetchUser')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Text>Loading...</Text>


    return (
        <Modal
            hasBackdrop={true}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            animationIn="slideInUp"
            isVisible={modalVisible}
            style={{ padding: 0, margin: 0 }}
        >
            <View style={modalstyles.centeredView}>

                <View style={[modalstyles.modalView,{height:user.role === user_role["Project-Manager"] ? heightPercentageToDP(30):heightPercentageToDP(60) }]} >

                    <View style={modalstyles.topContainer} >
                        <Text />
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Create Report</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>

                    {tabs?.filter((item) => item.role === user.role)[0].tabs?.map((item) => {
                        return <View style={{ width: '100%', gap: 20 }} >
                            <Text style={modalstyles.radioHeading}>{item?.heading}</Text>
                            {item?.subTabs?.map((option, index) => (
                                <View key={index}>
                                    <RadioButtonGroup
                                        selected={selectedRadio}
                                        onSelected={(value: string) => handleSelect(value)}
                                        radioBackground={Colors.primary_blue}

                                    >
                                        <RadioButtonItem
                                            value={option}
                                            label={
                                                <Text style={{ marginLeft: 10, fontSize: widthPercentageToDP(4) }}>{option}</Text>
                                            }
                                        />
                                    </RadioButtonGroup>
                                </View>
                            ))}
                        </View>
                    })}


                    <View style={modalstyles.bottomContainer} >
                        <Components.Button onPress={() => submit()} title='Proceed' />
                    </View>

                </View>
            </View>
        </Modal >
    )
}

const modalstyles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: heightPercentageToDP(60),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-between',
        paddingTop: heightPercentageToDP(2),
        paddingBottom: heightPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(5)
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomContainer: { flexDirection: 'column', gap: 10, justifyContent: 'space-between', width: '100%' },
    radioHeading: { fontWeight: 'bold', fontSize: widthPercentageToDP(5) }
});