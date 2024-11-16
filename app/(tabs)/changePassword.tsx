import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Router, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { Components } from '@/components';
import PasswordUpdateModal from '@/components/PasswordUpdateModal';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';

const ChangePassword = () => {
    const router: Router = useRouter();
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [oldShowPassword, setOldShowPassword] = useState(true);
    const [newShowPassword, setNewShowPassword] = useState(true);
    const [confirmShowPassword, setConfirmShowPassword] = useState(true);

    const passwordRequirements = [
        { text: 'At least 8 characters', isValid: newPassword.length >= 8 },
        { text: 'At least 1 special character', isValid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
        { text: 'At least 1 number', isValid: /\d/.test(newPassword) },
    ];

    const isPasswordValid = passwordRequirements.every((req) => req.isValid);
    const isButtonEnabled = isPasswordValid && newPassword === confirmPassword;

    return (
        <>
            <View style={styles.topContainer}>
                <View style={styles.topSubContainer}>
                    <AntDesign onPress={() => router.push({ pathname: '/(tabs)/profile' })} name="left" size={24} color="black" />
                    <Text style={styles.headerText}>Change Password</Text>
                    <AntDesign style={{ opacity: 0 }} name="left" size={24} color="black" />
                </View>
            </View>

            <ScrollView style={{ paddingTop: heightPercentageToDP(2) }}>
                <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>
                    <View style={styles.flexContainer}>
                        <Text style={styles.headerText}>Account Details</Text>
                    </View>
                    <View style={{ gap: heightPercentageToDP(3), marginTop: heightPercentageToDP(2) }}>
                        <Components.Input
                            icon
                            value={oldPassword}
                            onIconPress={() => setOldShowPassword(!oldShowPassword)}
                            showPassword={oldShowPassword}
                            setValue={setOldPassword}
                            title="Old Password"
                            placeholder="Enter password here"
                        />
                        <Components.Input
                            icon
                            onIconPress={() => setNewShowPassword(!newShowPassword)}
                            value={newPassword}
                            showPassword={newShowPassword}

                            setValue={setNewPassword}
                            title="New Password"
                            placeholder="Enter password here"
                        />
                        <View>
                            {passwordRequirements.map((req, index) => (
                                <View style={{ flexDirection: 'row', gap: 5 }} >
                                    <SvgXml xml={req.isValid ? Images.valid() : Images.invalid()} />
                                    <Text
                                        key={index}
                                        style={{
                                            color: req.isValid ? Colors.green : Colors.red,
                                            fontSize: widthPercentageToDP(3.5),
                                            marginBottom: 5,
                                        }}
                                    >
                                        {req.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <Components.Input
                            icon
                            onIconPress={() => setConfirmShowPassword(!confirmShowPassword)}
                            showPassword={confirmShowPassword}
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            title="Confirm New Password"
                            placeholder="Enter password here"
                        />

                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Components.Button
                    onPress={() => setSuccessModalVisible(true)}
                    title="UPDATE PASSWORD"
                    disabled={!isButtonEnabled}
                />
            </View>

            <PasswordUpdateModal modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible} />
        </>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    topContainer: {
        height: heightPercentageToDP(10),
        justifyContent: 'flex-end',
        backgroundColor: Colors.white,
        paddingBottom: 10,
    },
    topSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(5),
    },
    headerText: {
        fontSize: widthPercentageToDP(4.5),
        fontWeight: 'bold',
    },
    flexContainer: { flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' },
    buttonContainer: {
        bottom: heightPercentageToDP(5),
        position: 'absolute',
        width: '90%',
        left: '5%',
    },
});
