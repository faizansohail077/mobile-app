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

const CreateHSEInspection = () => {
    const router: Router = useRouter();
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState("")

    const onSuccess = () => {
        setSuccessModalVisible(false)
        router.push({ 'pathname': '/(tabs)/' })
    }


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
                    <Text style={styles.headerText}>HSE Inspection</Text>
                    <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: heightPercentageToDP(2) }} >
                <View >
                    <View style={{paddingHorizontal:widthPercentageToDP(5)}}>
                        <View style={{ gap: 20 }} >
                            <Text style={styles.headerText}>Inspection Details</Text>
                            <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Project' placeholder='Enter project name' />
                            <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Location' placeholder='Enter location here' />
                            <Components.Input value={name} setValue={setName} isTime inputTitleStyles={{ fontSize: 14 }} title='Date and time' placeholder='01 Jan 91, 13:25 PM' />
                            <Components.Input inputTitleStyles={{ fontSize: 14 }} title='Contractor' placeholder='Enter Contractor Name' />
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
                            <Text style={styles.headerText}>Additional Remarks</Text>
                            <Components.Input inputTitleStyles={{ fontSize: 12 }} title='Description' placeholder='Add additional remarks here' />
                            <Components.Button disabled={!photos.length} onPress={() => setSuccessModalVisible(true)} title='Submit' />
                        </View>
                    </View>
                </View>

                <View style={{ paddingTop: heightPercentageToDP(2) }} />
                <ReportViewModal cta={() => onSuccess()} buttonTitle='go back home' title='You have successfully submitted a HSE Inspection Report' modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible} />


            </ScrollView>
        </>
    )
}

export default CreateHSEInspection

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