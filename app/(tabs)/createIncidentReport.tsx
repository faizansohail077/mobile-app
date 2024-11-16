import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { Components } from '@/components';
import { ReportViewModal } from '@/components/Modal';
import { handleImagePicker, pickPDF } from '@/lib/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';

const CreateIncidentReport = () => {
  const router: Router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState({ text: "Near Miss", id: 0 })
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState<{ name: string; size: string }[]>([]);

  const [date, setDate] = useState("")

  const onSuccess = () => {
    setSuccessModalVisible(false)
    router.push({ 'pathname': '/(tabs)/' })
  }

  const tabs = [
    { text: "Near Miss", id: 0 },
    { id: 1, text: "Dangerous Occurance" },
    { id: 2, text: "Unsafe Act" },
    { id: 3, text: "Unsafe Condition" },
    { id: 4, text: "Incident Report" },
    { id: 5, text: "Safety Lapse" },
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


  const handleUploadPDF = async () => {
    const pdfDetails = await pickPDF();

    if (pdfDetails) {
      setDocuments((prevDocs) => [...prevDocs, pdfDetails]);
    }
  };

  const handleDeleteDocument = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <View style={styles.topContainer} >
        <View style={styles.topSubContainer} >
          <AntDesign onPress={() => router.push({ 'pathname': '/(tabs)/' })} name="left" size={24} color="black" />
          <Text style={styles.headerText}>Incident Reporting</Text>
          <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: heightPercentageToDP(2) }} >
        <View >
          <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>
            <Text style={styles.headerText}>Incident Type</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }} >
              {tabs.map((tab, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedTab(tab)} style={[styles.tagBox, { backgroundColor: selectedTab.id === tab.id ? Colors.primary_blue : Colors.white, borderWidth: 1, borderColor: Colors.primary_blue }]}>
                  <Text style={{ color: selectedTab.text === tab.text ? Colors.white : Colors.primary_blue }}>{tab.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>



          {/* name list */}

          <View style={styles.navigationTopContainer}>
            <View style={{ gap: 20 }} >
              <Text style={styles.headerText}>Incident details</Text>
              <Components.Input value={date} setValue={setDate} inputTitleStyles={{ fontSize: 14 }} title='Date and time' isCalendar placeholder='Enter Full Name' />
              <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Project' placeholder='Enter Project Name' />
              <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Description' placeholder='Describe the incident here' />
              <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Location' placeholder='Enter location' />
            </View>
          </View>

          {/* photo section */}
          <>
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


          </>

          {/* upload document */}

          <View style={styles.navigationTopContainer}>
            <View style={{ gap: 10 }} >
              <Text style={styles.headerText}>Supporting Document</Text>
              {!documents.length && <View style={{ alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(10), backgroundColor: Colors.light_grey }} >
                <View style={{ width: '70%' }} >
                  <Components.Button onPress={() => handleUploadPDF()} title={"Upload Document".toUpperCase()} />
                </View>
              </View>}
              {documents.map((doc, index) => (<View style={{ gap: 10 }} >
                <TouchableOpacity activeOpacity={0.7} style={styles.documentContainer} >
                  <View style={{ flexDirection: 'row', gap: 5 }} >
                    <SvgXml xml={Images.file()} />
                    <View>
                      <Text style={{ color: "rgba(69, 69, 69, 1)", fontWeight: '500' }} >{doc.name}</Text>
                      <Text style={{ color: "rgba(69, 69, 69, 1)" }}>{doc.size}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteDocument(index)}
                    activeOpacity={0.7}
                    style={[styles.deleteIcon, { backgroundColor: 'white' }]} >

                    <Ionicons name="trash"
                      size={24} color={Colors.dark_red} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              ))}

              {documents.length > 0 && <Text style={{ color: Colors.primary_blue, textAlign: 'center' }} >UPLOAD MORE DOCUMENT</Text>}
            </View>
          </View>
          {/*  */}

          <View style={styles.navigationTopContainer}>
            <View style={{ gap: 20 }} >
              <Text style={styles.headerText}>Recommendation</Text>
              <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Corrective action raised' placeholder='Enter Project Name' />
              <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Prevention action raised' placeholder='Describe the incident here' />
              <View style={{ marginTop: heightPercentageToDP(3) }}>
                <Components.Button backgroundColor={Colors.dark_red} disabled={!photos.length} onPress={() => setSuccessModalVisible(true)} title='Report Incident' />
              </View>
            </View>
          </View>


        </View>

        <View style={{ paddingTop: heightPercentageToDP(2) }} />
        <ReportViewModal cta={() => onSuccess()} buttonTitle='go back home' title='You have successfully reported an incident' modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible} />


      </ScrollView>
    </>
  )
}

export default CreateIncidentReport

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
  documentContainer: { backgroundColor: '#FAF9F6', borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }

})