import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { Components } from '@/components';

const HSEInspection = () => {
  const router: Router = useRouter();
  const tags = [{ text: "HSE Inspection", color: Colors.dark_blue }]

  return (
    <>
      <View style={styles.topContainer} >
        <View style={styles.topSubContainer} >
          <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/' })} name="left" size={24} color="black" />
          <Text style={styles.headerText}>Incident Report</Text>
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
              <Text style={styles.keyText}>Submitted: </Text>
              <Text style={styles.valueText}>4 Feb 22 at 14:05</Text>
            </View>

          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Incident details</Text>
            <View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Project: </Text>
                <Text style={styles.valueText}>LTA PL208 - CYCLING PATH</Text>
              </View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Location: </Text>
                <Text style={styles.valueText}>Block C, Common Corridor</Text>
              </View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Date and time: </Text>
                <Text style={styles.valueText}>23 Jan 22 at 13:15 PM</Text>
              </View>
              <View style={[styles.flexContainer, { justifyContent: 'flex-start', marginTop: heightPercentageToDP(1) }]} >
                <Text style={styles.keyText}>Contractor: </Text>
                <Text style={styles.valueText}>Jupiter Builder Pte Ltd</Text>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Photo Evidence #1</Text>
            <SvgXml xml={Images.evidence()} />
            <Text style={styles.keyText}>Observation: </Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>Site personnel found to be working without
              proper PPE (ear plugs and gloves)</Text>
            <SvgXml xml={Images.evidence()} />
            <Text style={styles.keyText}>Rectification: </Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>Verbal warning was given to the worker and proper PPEs were worn before allowing him to continue of work.</Text>
          </View>
        </View>

        <View style={styles.navigationTopContainer}>
          <View style={{ gap: 10 }} >
            <Text style={styles.headerText}>Additional Remarks</Text>
            <Text style={[styles.valueText, { lineHeight: heightPercentageToDP(2.5) }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>

            <Components.Button buttonContainerStyle={{ marginTop: 20 }} title={`download report`.toUpperCase()} />
            <Components.Button textColor={Colors.primary_blue} backgroundColor='white' buttonContainerStyle={{ marginTop: 5, borderWidth: 1, borderColor: Colors.primary_blue }} title={`email report`.toUpperCase()} />
          </View>
        </View>

        <View style={{ paddingTop: heightPercentageToDP(2) }} />

      </ScrollView>
    </>
  )
}

export default HSEInspection

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