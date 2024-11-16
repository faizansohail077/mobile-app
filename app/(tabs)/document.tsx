import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';
import { tab_list } from '@/constants/user';
import DocumentCard from '@/components/Card/DocumentCard';

const tabs = [
  { id: 0, text: "hdb" },
  { id: 1, text: "lta" },
  { id: 2, text: "jtc" },
  { id: 3, text: "others" },
]

const Document = () => {
  const router: Router = useRouter();
  const [selectedTab, setSelectedTab] = useState<any>({ id: 0, text: "hdb" });

  const renderTab = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.tab,
        selectedTab?.id === item.id ? styles.activeTab : styles.inactiveTab,
      ]}
      onPress={() => handleTabPress(item)}
    >
      <Text style={[styles.tabText,
      selectedTab?.id === item.id ? styles.activeTabText : styles.inactiveTabText
      ]}>{item.text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
  const handleTabPress = (item: any) => {
    setSelectedTab(item);
  };


  return (
    <>
      <View style={styles.topContainer} >
        <View style={styles.topSubContainer} >
          <Text style={styles.headerText}>All documents</Text>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', zIndex: -1 }} >
        <FlatList
          horizontal
          data={tabs || []}
          renderItem={renderTab}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: heightPercentageToDP(2) }} >
        <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>
          {["Risk Assessment", "Safe Work Procedure", "Newsletter"].map((item, index) => {
            return (
              <DocumentCard key={index} title={item} />
            )
          })
          }
        </View>


        <View style={{ paddingTop: heightPercentageToDP(2) }} />


      </ScrollView>
    </>
  )
}

export default Document

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
    justifyContent: 'center',
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

