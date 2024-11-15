import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from ".";
import Checkbox from 'expo-checkbox';
import { useState } from "react";

const options = ["Working at Height", "Confined Space", "Excavation", "Hot Work"];


export default function FilterModalComponent({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(prev => prev.filter(item => item !== option));
        } else {
            setSelectedOptions(prev => [...prev, option]);
        }
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
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Filter</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', gap: 20 }} >
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Type of permit</Text>
                        {options.map((option, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} >

                                <Checkbox
                                    value={selectedOptions.includes(option)} // Check if this option is selected
                                    onValueChange={() => handleSelect(option)}
                                />
                                <TouchableOpacity onPress={() => handleSelect(option)}>
                                    <Text style={{ fontSize: widthPercentageToDP(4) }}>{option}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>


                    <View style={modalstyles.bottomContainer} >
                        <Components.Button title='Apply Filter' onPress={() => setModalVisible(!modalVisible)} />
                        <TouchableOpacity activeOpacity={0.7} >
                            <Text style={modalstyles.bottomContainerText} >Remove Filter</Text>
                        </TouchableOpacity>
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
    bottomContainer: { flexDirection: 'column', gap: 10, justifyContent: 'space-between', width: '100%' },
    bottomContainerText: { color: 'rgba(0, 0, 0, 0.38)', textAlign: 'center', fontSize: widthPercentageToDP(4) }
});