import { Image, StyleSheet, ScrollView, View, Text, KeyboardAvoidingView, Alert } from 'react-native';

import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { Components } from '@/components';
import { useState } from 'react';
import { Router, useRouter } from 'expo-router';
import Modal from "react-native-modal";
import AppVersion from '@/components/Version';
import { users } from '@/constants/user';
import { addData } from '@/lib/helpers';

export default function HomeScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router: Router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const submit = () => {

    const findEmail = users.find((user) => user.email === email)
    if (!findEmail) {
      setModalVisible(true)
    } else {
      router.replace('/(tabs)')
      addData('user', findEmail)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
        <Image
          source={require('@/assets/images/image.png')}
          style={styles.reactLogo}
        />
        <View style={styles.topContainer} >
          <SvgXml xml={Images.logo()} />

          <View style={styles.inputContainer} >
            <Components.Input value={email} setValue={setEmail} title='Email Address' placeholder='Enter email address here' />
            <Components.Input value={password} setValue={setPassword} showPassword={showPassword} onIconPress={() => setShowPassword(!showPassword)} title='Password' placeholder='Enter password here' icon />
          </View>

          <View style={styles.buttonContainer} >
            <Components.Button onPress={() => submit()} disabled={!email || !password} title='SUBMIT' />
          </View>

          <View style={{ marginTop: heightPercentageToDP(5) }}>
            <AppVersion />
          </View>
        </View>

        <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: heightPercentageToDP(45),
    width: widthPercentageToDP(100),
    objectFit: 'cover',
    borderBottomLeftRadius: widthPercentageToDP(15)
  },
  topContainer: { flexDirection: 'column', gap: 10, marginTop: heightPercentageToDP(3), marginHorizontal: widthPercentageToDP(5), height: heightPercentageToDP(55), alignItems: 'center' },
  inputContainer: { marginTop: heightPercentageToDP(3), width: "100%", gap: 20 },
  buttonContainer: { marginTop: heightPercentageToDP(3), width: '100%' },
});


const ModalComponent = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) => {
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
          <View style={{ flexDirection: 'column', height: "70%", justifyContent: 'space-between', width: '100%' }} >

            <Text style={{ color: "rgba(18, 18, 18, 1)", fontWeight: 'bold', fontSize: widthPercentageToDP(7), textAlign: 'center' }} >There seem to be an error trying to log you in</Text>
            <Text style={{ color: "rgba(18, 18, 18, 1)", fontSize: widthPercentageToDP(4), textAlign: 'center' }}>Double check your credentials and login again or contact <Text style={{ fontWeight: 'bold' }} >admin@jupiterbuilder.com.sg</Text> for assistance.</Text>
            <Components.Button title='GO BACK' onPress={() => setModalVisible(!modalVisible)} />
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