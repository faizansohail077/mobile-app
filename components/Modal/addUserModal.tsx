import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from "@/components";


export default function AddUserModal({ email, setEmail, password, setPassword, role, setRole, setSuccessModalVisible, modalVisible, setModalVisible, successModalVisible }: { email: string, setEmail: any, password: string, setPassword: any, role: string, setRole: any, successModalVisible: boolean, setSuccessModalVisible: any, modalVisible: boolean, setModalVisible: any }) {

    const submit = async () => {
        setModalVisible(!modalVisible)
        setTimeout(() => {
            setSuccessModalVisible(!successModalVisible)
        }, 500)
    }
    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
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
                        <Text style={{ fontWeight: 'bold', fontSize: widthPercentageToDP(5) }} >Create User</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} >
                            <SvgXml xml={Images.close()} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%' }} >
                        <Text>Fill in the input fields to create new user.</Text>
                    </View>

                    <View style={{ width: '100%', gap: 20 }} >
                        <Components.Input value={email} setValue={setEmail} placeholder="Enter email for user here" title="Email" inputTitleStyles={{ fontSize: widthPercentageToDP(3) }} />
                        <Components.Input value={password} setValue={setPassword} placeholder="Enter password for user here" title="Password" inputTitleStyles={{ fontSize: widthPercentageToDP(3) }} />

                        <Components.Select
                            title="Select an Option"
                            options={options}
                            selectedValue={role}
                            setSelectedValue={setRole}
                            placeholder="Choose one"
                        />
                    </View>

                    <View style={{ width: '100%' }} >
                        <Components.Button disabled={!role || !password || !email} title={'continue'.toUpperCase()} onPress={() => submit()} />
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