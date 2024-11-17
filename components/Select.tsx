import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '@/constants/Colors';
import { Images } from '@/assets/images';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

const Select = ({
    title,
    options,
    selectedValue,
    setSelectedValue,
    placeholder = 'Select an option',
    inputTitleStyles,
}: {
    title: string;
    options: Array<{ label: string; value: string }>;
    selectedValue?: string;
    setSelectedValue: (value: string) => void;
    placeholder?: string;
    inputTitleStyles?: any;
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsFocused(!isFocused)}
            style={styles.inputContainer}
        >
            <Text
                style={[
                    styles.inputTitle,
                    inputTitleStyles,
                    { color: isFocused ? Colors.primary_blue : 'rgba(0, 0, 0, 0.6)' },
                ]}
            >
                {title}
            </Text>
            <View
                style={[
                    styles.inputFieldContainer,
                    { borderBottomColor: isFocused ? Colors.primary_blue : 'rgba(0, 0, 0, 0.42)' },
                ]}
            >
                <Text style={styles.inputField}>
                    {selectedValue
                        ? options.find((option) => option.value === selectedValue)?.label
                        : placeholder}
                </Text>
                <TouchableOpacity onPress={() => setIsFocused(!isFocused)}>
                    <AntDesign name="down" size={18} color="black" />
                </TouchableOpacity>
            </View>

            {isFocused && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => {
                            console.log(itemValue,'itemValue')
                            setSelectedValue(itemValue);
                            setIsFocused(false);
                        }}
                        style={Platform.OS === 'ios' ? styles.iosPicker : styles.androidPicker}
                    >
                        {options.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Select;

const styles = StyleSheet.create({
    inputContainer: { flexDirection: 'column', gap: 5 },
    inputTitle: { fontSize: widthPercentageToDP(3.5) },
    inputFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    inputField: { width: '90%', fontSize: widthPercentageToDP(4), color: 'black' },
    pickerContainer: {
        backgroundColor: Colors.light_grey,
        borderRadius: 5,
        marginTop: 5,
    },
    iosPicker: { width: '100%' },
    androidPicker: { width: '100%' },
});
