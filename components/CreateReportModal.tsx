import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from ".";
import { useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import { Colors } from "@/constants/Colors";

export default function CreateReportModalComponent({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) {
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedRadio((prev) => (prev === option ? null : option));
    };

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
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Create Report</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', gap: 20 }} >
                        <Text style={modalstyles.radioHeading}>Frequently used</Text>
                        {["Daily Checklist", "Permit To Work", "Communication Record"].map((option, index) => (
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

                    <View style={{ width: '100%', gap: 20 }}>
                        <Text style={modalstyles.radioHeading}>Others</Text>
                        {["Monthly Checklist", "Incident Reporting", "MS, RA and SWP"].map((option, index) => (
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


                    <View style={modalstyles.bottomContainer} >
                        <Components.Button title='Proceed' />
                    </View>

                </View>
            </View>
        </Modal>
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