import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { Components } from '@/components';
import { ReportViewModal } from '@/components/Modal';
import { handleImagePicker } from '@/lib/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';

const CreateCommunicationReport = () => {
  const router: Router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState({ text: "Tool box briefing", id: 0 })
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState("")

  const onSuccess = () => {
    setSuccessModalVisible(false)
    router.push({ 'pathname': '/(tabs)/' })
  }

  const tabs = [
    { text: "Tool box briefing", id: 0 },
    { id: 1, text: "Safety Time Out Record" },
    { id: 2, text: "Training Record" },
    { id: 3, text: "Mass Tool Box Briefing" }
  ]

  const addPhoto = async (index: number) => {
    try {
      const imageUri = await handleImagePicker();
      if (imageUri) {
        setPhotos((prevPhotos) => {
          const newPhotos: any = [...prevPhotos];
          newPhotos[index] = imageUri;
          return newPhotos;
        });
      }
    } catch (error) {
      console.log(error, 'error')
      alert("Failed to add photo");
    }
  };

  const removePhoto = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to delete this photo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setPhotos((prevPhotos) => {
              const newPhotos = [...prevPhotos];
              newPhotos.splice(index, 1);
              return newPhotos;
            });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <>
      <View style={styles.topContainer} >
        <View style={styles.topSubContainer} >
          <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/' })} name="left" size={24} color="black" />
          <Text style={styles.headerText}>Communication Record</Text>
          <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: heightPercentageToDP(2) }} >
        <View >
          <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>
            <Text style={styles.headerText}>Record Type</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }} >
              {tabs.map((tab, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedTab(tab)} style={[styles.tagBox, { backgroundColor: selectedTab.id === tab.id ? Colors.primary_blue : Colors.white, borderWidth: 1, borderColor: Colors.primary_blue }]}>
                  <Text style={{ color: selectedTab.text === tab.text ? Colors.white : Colors.primary_blue }}>{tab.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>


          {photos.map((photo, index) => (
            <View style={styles.navigationTopContainer}>
              <View style={{ gap: 10 }} >
                <Text style={styles.headerText}>Photo Evidence #{index + 1}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(photo ? 30 : 10), backgroundColor: Colors.light_grey }} >
                  {photo ? (

                    <View style={{ height: heightPercentageToDP(30), width: '100%' }} >
                      <Image source={{ uri: photo }} style={styles.photo} />
                      <TouchableOpacity
                        onPress={() => removePhoto(index)}
                        activeOpacity={0.7}
                        style={[styles.deleteIcon, { backgroundColor: 'white' }]} >

                        <Ionicons name="trash"
                          size={24} color={Colors.dark_red} />
                      </TouchableOpacity>

                    </View>
                  )
                    : (
                      <View style={{ width: '100%' }} >
                        <Components.Button onPress={() => addPhoto(index)} title="Upload Photo" />
                      </View>
                    )
                  }
                </View>
              </View>
            </View>
          ))
          }
          <View style={styles.navigationTopContainer}>
            <View style={{ gap: 10 }} >
              <Text style={styles.headerText}>Photo Evidence #{photos.length + 1}</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(10), backgroundColor: Colors.light_grey }} >
                <View style={{ width: '70%' }} >
                  <Components.Button onPress={() => addPhoto(photos.length)} title="Upload Photo" />
                </View>
              </View>
            </View>
          </View>

          {/* name list */}

          <View style={styles.navigationTopContainer}>
            <View style={{ gap: 20 }} >
              <Text style={styles.headerText}>Name List</Text>
              <Components.Input value={name} setValue={setName} inputTitleStyles={{ fontSize: 14 }} title='Full Name' placeholder='Enter Full Name' />
              <Components.Input value={name} setValue={setName} inputTitleStyles={{ fontSize: 14 }} title='Full Name' placeholder='Enter Full Name' />
              <Components.Input value={name} setValue={setName} inputTitleStyles={{ fontSize: 14 }} title='Full Name' placeholder='Enter Full Name' />
              <Components.Input value={name} setValue={setName} inputTitleStyles={{ fontSize: 14 }} title='Full Name' placeholder='Enter Full Name' />
              <Components.Input value={name} setValue={setName} inputTitleStyles={{ fontSize: 14 }} title='Full Name' placeholder='Enter Full Name' />
              <Text style={{ textAlign: 'center', color: Colors.primary_blue }} >{`add 5 more rows`.toUpperCase()}</Text>
              <Components.Button disabled={!photos.length} onPress={() => setSuccessModalVisible(true)} title='Submit' />
            </View>
          </View>
        </View>

        <View style={{ paddingTop: heightPercentageToDP(2) }} />
        <ReportViewModal cta={() => onSuccess()} buttonTitle='go back home' title='You have successfully submitted a Communication Report' modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible} />


      </ScrollView>
    </>
  )
}

export default CreateCommunicationReport

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
  navigationContainer: { marginTop: heightPercentageToDP(2), borderWidth: 1, borderColor: Colors.primary_blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(1.5) },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
})