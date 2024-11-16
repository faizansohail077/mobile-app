import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from "@/components";


export default function AskToAcknowlegedeModal({ setSuccessModalVisible, modalVisible, setModalVisible, successModalVisible }: { successModalVisible: boolean, setSuccessModalVisible: any, modalVisible: boolean, setModalVisible: any }) {

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
        <View style={{ alignItems: 'center', zIndex: 1 }} >
          <SvgXml style={{ marginBottom: -40 }} xml={Images.error()} />
        </View>
        <View style={modalstyles.modalView} >
          <View style={{ flexDirection: 'column', height: "60%", justifyContent: 'space-between', width: '100%' }} >

            <Text style={{ color: "rgba(18, 18, 18, 1)", fontWeight: 'bold', fontSize: widthPercentageToDP(6), textAlign: 'center' }} >Acknowledge Memorandum?</Text>
            <Text style={{ color: "rgba(18, 18, 18, 1)", fontSize: widthPercentageToDP(4), textAlign: 'center' }}>This action is irreversible. Please confirm before proceeding.</Text>
            <Components.Button title={'acknowledge'.toUpperCase()} onPress={() => submit()} />
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
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(5)
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});