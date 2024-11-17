import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from "@/components";
import { useState } from "react";


export default function TypingModal({ showSubTitle = true, title, inputTitle, setSuccessModalVisible, modalVisible, setModalVisible, successModalVisible }: { inputTitle?: string, showSubTitle?: boolean, title?: string, successModalVisible: boolean, setSuccessModalVisible: any, modalVisible: boolean, setModalVisible: any }) {
    const [desc, setDesc] = useState('')
    const submit = async () => {
        setModalVisible(!modalVisible)
        setTimeout(() => {
            setSuccessModalVisible(!successModalVisible)
        }, 500)
    }

    return (
        <Modal
            hasBackdrop={true}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            animationIn="slideInUp"
            isVisible={modalVisible}
            style={{ padding: 0, margin: 0 }}
        >
            <View style={modalstyles.centeredView}>

                <View style={[modalstyles.modalView,{height:!showSubTitle ? heightPercentageToDP(30):heightPercentageToDP(40)}]} >

                    <View style={modalstyles.topContainer} >
                        <Text />
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >{title ? title : 'Reject PTW'}</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>

                    {showSubTitle && <View style={{ width: '100%' }} >
                        <Text>Fill in the reason for rejection below before proceeding to submit.</Text>
                    </View>
                    }

                    <View style={{ width: '100%' }} >
                        <Components.Input value={desc} setValue={setDesc} placeholder="Enter reason for rejection here" title={inputTitle ? inputTitle : "Reason for rejection"} inputTitleStyles={{ fontSize: widthPercentageToDP(3) }} />
                    </View>

                    <View style={{ width: '100%' }} >
                        <Components.Button disabled={desc.length < 3} title={'continue'.toUpperCase()} onPress={() => submit()} />
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
        height: heightPercentageToDP(40),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // justifyContent: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        paddingTop: heightPercentageToDP(5),
        gap: 20
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
});