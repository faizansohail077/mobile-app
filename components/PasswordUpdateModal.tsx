import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Images } from "@/assets/images";
import { Components } from ".";
import { Router, useRouter } from "expo-router";
import { removeData } from "@/lib/helpers";


export default function PasswordUpdateModal({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) {
  const router: Router = useRouter();

  const submit = async () => {
    await removeData("user")
    router.push({ pathname: "/login" })
    setModalVisible(!modalVisible)
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
          <SvgXml style={{ marginBottom: -40 }} xml={Images.success()} />
        </View>
        <View style={modalstyles.modalView} >
          <View style={{ flexDirection: 'column', height: "60%", justifyContent: 'space-between', width: '100%' }} >

            <Text style={{ color: "rgba(18, 18, 18, 1)", fontWeight: 'bold', fontSize: widthPercentageToDP(7), textAlign: 'center' }} >Your password is successfully updated</Text>
            <Text style={{ color: "rgba(18, 18, 18, 1)", fontSize: widthPercentageToDP(4), textAlign: 'center' }}>For security reasons, you will be required to log in again with the new password.</Text>
            <Components.Button title={'go back to login page'.toUpperCase()} onPress={() => submit()} />
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