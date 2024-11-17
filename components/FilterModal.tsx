import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from ".";
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from "react";
import { getData } from "@/lib/helpers";
import { user_role } from "@/constants/user";

const options = [
    {
        heading: "Type of permit",
        tabs: ["Working at Height", "Confined Space", "Excavation", "Hot Work"]

    }

];

const adminOptions = [
    {
        heading: "Type of report",
        tabs: ["Daily Checklist", "Communication Record", "HSE Inspection", "Monthly Checklist", "Incident Reporting", "MS, RA and SWP"]

    },
    {
        heading: "Communication Record",
        tabs: ["Tool box briefing", "Safety Time Out Record", "Training Record", "Mass Tool Box Briefing"]
    },
    {
        heading: "Incident Type",
        tabs: ["Near Miss", "Dangerous Occurance", "Unsafe Act", "Unsafe Condition", "Incident Report", "Safety Lapse"]
    },

]

export default function FilterModalComponent({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [filterList, selectedFilterList] = useState<any>([]);
    const [user, setUser] = useState<any>({})
    const [loader, setLoader] = useState(true)

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(prev => prev.filter(item => item !== option));
        } else {
            setSelectedOptions(prev => [...prev, option]);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.role === user_role["Admin"]) {
                selectedFilterList(adminOptions)
            } else {
                selectedFilterList(options)
            }
        }
    }, [user])

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
        <Modal
            hasBackdrop={true}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            animationIn="slideInUp"
            isVisible={modalVisible}
            style={{ padding: 0, margin: 0 }}
        >
            <View style={modalstyles.centeredView}>

                <View style={modalstyles.modalView} >

                    <View style={modalstyles.topContainer} >
                        <Text />
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Filter</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1, width: '100%', marginTop: 20 }} showsVerticalScrollIndicator={false} >

                        <View style={{ width: '100%', gap: 20 }} >
                            {filterList.map((optiontab:any, index:any) => (
                                <View key={index} style={{ gap: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >{optiontab.heading}</Text>
                                    {optiontab.tabs.map((option:any, index:any) => {
                                        return (
                                            < View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} >

                                                <Checkbox
                                                    value={selectedOptions.includes(option)} // Check if this option is selected
                                                    onValueChange={() => handleSelect(option)}
                                                />
                                                <TouchableOpacity onPress={() => handleSelect(option)}>
                                                    <Text style={{ fontSize: widthPercentageToDP(4) }}>{option}</Text>
                                                </TouchableOpacity>
                                            </View >
                                        )
                                    })}
                                </View>
                            ))}

                        </View>



                    </ScrollView>
                    <View style={modalstyles.bottomContainer} >
                        <Components.Button title='Apply Filter' onPress={() => setModalVisible(!modalVisible)} />
                        <TouchableOpacity activeOpacity={0.7} >
                            <Text style={modalstyles.bottomContainerText} >Remove Filter</Text>
                        </TouchableOpacity>
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
        height: heightPercentageToDP(50),
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
    bottomContainer: { marginTop: 20, flexDirection: 'column', gap: 10, justifyContent: 'space-between', width: '100%' },
    bottomContainerText: { color: 'rgba(0, 0, 0, 0.38)', textAlign: 'center', fontSize: widthPercentageToDP(4) }
});