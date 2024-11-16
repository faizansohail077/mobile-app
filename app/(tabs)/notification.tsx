import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { MemoCard } from '@/components/Card';

const tabs = [{ id: 0, text: "ALL NOTIFICATIONS" }, { id: 1, text: "COMPANY MEMO" }]

const Notifications = () => {
  const router: Router = useRouter();
  const [selectedTab, setSelectedTab] = useState<any>({ id: 0, text: "ALL NOTIFICATIONS" });

  const handleTabPress = (item: any) => {
    setSelectedTab(item);
  };

  const renderTab = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.tab,
        selectedTab?.id === item.id ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => handleTabPress(item)}
    >
      <Text style={[styles.tabText,
      selectedTab?.id === item.id ? styles.activeTabText : styles.inactiveTabText
      ]}>{item.text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.topContainer} >
        <View style={styles.topSubContainer} >
          <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/' })} name="left" size={24} color="black" />
          <Text style={styles.headerText}>View Notifications</Text>
          <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', zIndex: -1 }} >
        {tabs.map((item, index) => {
          return (
            <View key={index} style={{ width: '50%' }}>
              {renderTab({ item })}
            </View>
          )
        })}
      </View>



      <ScrollView style={{paddingHorizontal:widthPercentageToDP(5), paddingTop: heightPercentageToDP(2) }} >

        {selectedTab.id === 1 ? <>
        <MemoCard/>
        
        </> : <></>}

      </ScrollView>
    </>
  )
}

export default Notifications

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
  headerText: {
    fontSize: widthPercentageToDP(4.5),
    fontWeight: 'bold'
  },

  tab: {
    minWidth: widthPercentageToDP(25),
    paddingVertical: heightPercentageToDP(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderBottomWidth: 2
  },
  activeTab: {
    borderBottomColor: Colors.primary_blue
  },
  inactiveTab: {
    borderBottomColor: Colors.white

  },
  activeTabText: {
    color: Colors.primary_blue,
  },
  inactiveTabText: {
    color: Colors.light_black,
  },
  tabText: {
    color: Colors.white,
    fontWeight: '500',
  },
})