import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { getData } from '@/lib/helpers';
import { Components } from '@/components';
import { user_role } from '@/constants/user';
import { ReportViewModal } from '@/components/Modal';
import TypingModal from '@/components/Modal/typingModal';

const InReview = () => {
  const router: Router = useRouter();
  const tags = [{ text: "In Review", color: Colors.orange }, { text: "Hot Work", color: Colors.purple }]
  const [user, setUser] = useState<any>({})
  const [loader, setLoader] = useState(true)

  const [approveModal, setApproveModal] = useState(false)
  const [confirmApproveModal, setConfirmApproveModal] = useState(false)

  const [rejectModal, setRejectModal] = useState(false)
  const [confirmRejectModal, setConfirmRejectModal] = useState(false)

  const rejected = () => {
    setRejectModal(false)
    router.push({ 'pathname': '/(tabs)/' })
  }

  const approved = () => {
    setApproveModal(false)
    router.push({ 'pathname': '/(tabs)/' })
  }

  const confirmApprove = () => {
    setConfirmApproveModal(false)
    setTimeout(() => {
      setApproveModal(true)
    }, 500)

  }
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
          <Text style={styles.headerText}>PTW Detail Page</Text>
          <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: heightPercentageToDP(2) }} >
        <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>

          <View style={styles.flexContainer} >
            <Text style={styles.headerText}>PTW 415929374-1234</Text>
          </View>

          <View style={styles.tagContainer} >
            {tags?.map((tag: { text: string, color: string }, index: number) => {
              return (
                <View key={index} style={[styles.tagBox, { backgroundColor: tag.color, }]} >
                  <Text style={{ fontWeight: '500', color: tag.color === Colors.light_grey ? Colors.light_black : Colors.white }} >
                    {tag.text}
                  </Text>
                </View>
              )
            })}
          </View>
          <View>

            <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(2) }]} >
              <Text style={styles.keyText}>Issued: </Text>
              <Text style={styles.valueText}>4 Feb 22 at 14:05</Text>
            </View>


            <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
              <Text style={styles.keyText}>Expiry: </Text>
              <Text style={styles.valueText}>8 Feb 22 at 18:00</Text>
            </View>

            <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
              <Text style={styles.keyText}>Full Name: </Text>
              <Text style={styles.valueText}>Leslie Lim Ah Kao</Text>
            </View>

            <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
              <Text style={styles.keyText}>Location: </Text>
              <Text style={styles.valueText}>Location of work</Text>
            </View>

            <View style={[styles.flexContainer, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
              <Text style={styles.keyText}>Work Description: </Text>
              <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
            </View>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Safety Precautions</Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Permit Conditions</Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Photo Evidence #1</Text>
            <SvgXml xml={Images.evidence()} />
          </View>

          <View style={[styles.flexContainer, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
            <Text style={styles.keyText}>Observation: </Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>Site personnel found to be working without
              proper PPE (ear plugs and gloves).</Text>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Other Details</Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Issuer Detail</Text>
            <View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Name: </Text>
                <Text style={styles.valueText}>Peter Tan</Text>
              </View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Role: </Text>
                <Text style={styles.valueText}>Chief Supervisor</Text>
              </View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Issued: </Text>
                <Text style={styles.valueText}>4 Feb 22 at 14:05</Text>
              </View>


              {user.role === user_role["Safety-Assessor"] && <View style={{ flexDirection: 'row', gap: 5, marginTop: heightPercentageToDP(3) }} >
                <Components.Button buttonContainerStyle={{ width: "50%", backgroundColor: Colors.red }} onPress={() => setConfirmRejectModal(true)} backgroundColor={Colors.dark_red} title='REJECT' />
                <Components.Button buttonContainerStyle={{ width: "50%", backgroundColor: Colors.red }} onPress={() => setConfirmApproveModal(true)} backgroundColor={Colors.green} title='APPROVED' />
              </View>}
            </View>
          </View>
        </View>

        <View style={{ paddingTop: heightPercentageToDP(2) }} />
        <ReportViewModal Image={Images.error()} modalVisible={confirmApproveModal} setModalVisible={setConfirmApproveModal} title='Proceed to approve this PTW?' subTitle='This action is irreversible. Please confirm before proceeding.' buttonTitle={`proceed to approve`.toUpperCase()} cta={() => confirmApprove()} />
        <ReportViewModal modalVisible={approveModal} setModalVisible={setApproveModal} title='This PTW has been approved' subTitle='Go back home to view all other PTWs that are pending action.' buttonTitle={`go back home`.toUpperCase()} cta={() => approved()} />

        <TypingModal modalVisible={confirmRejectModal} setModalVisible={setConfirmRejectModal} successModalVisible={rejectModal} setSuccessModalVisible={setRejectModal} />
        <ReportViewModal modalVisible={rejectModal} setModalVisible={setRejectModal} title='This PTW has been rejected' subTitle='Go back home to view all other PTWs that are pending action.' buttonTitle={`go back home`.toUpperCase()} cta={() => rejected()} />
      </ScrollView>
    </>
  )
}

export default InReview

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
  tagContainer: { marginTop: heightPercentageToDP(1), flexDirection: "row", gap: 5, alignItems: 'center' },
  tagBox: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 100, },
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