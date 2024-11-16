import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '@/constants/Colors';

const Input = ({
  subTitle,
  inputTitleStyles,
  value,
  setValue,
  title,
  placeholder,
  icon = false,
  onIconPress,
  showPassword = false,
  isCalendar = false,
}: {
  inputTitleStyles?: any;
  subTitle?: string;
  value?: string;
  setValue?: any;
  showPassword?: boolean;
  title: string;
  placeholder: string;
  icon?: boolean;
  onIconPress?: () => void;
  isCalendar?: boolean;
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (!isCalendar) {
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setIsFocused(false); // Hide the date picker after a date is selected
    if (selectedDate) {
      setValue(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleFocus}
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
        {isCalendar ? (
          <Text style={styles.inputField}>{value || placeholder}</Text>
        ) : (
          <TextInput
            value={value}
            onChangeText={(e) => {
              setValue ? setValue(e) : console.log(e, 'e text');
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            autoCapitalize="none"
            secureTextEntry={showPassword}
            placeholderTextColor={isFocused ? Colors.primary_blue : 'rgba(0, 0, 0, 0.38)'}
            placeholder={isFocused ? '' : placeholder}
            style={styles.inputField}
          />
        )}
        {icon && (
          <TouchableOpacity onPress={onIconPress}>
            <SvgXml xml={Images.eye()} />
          </TouchableOpacity>
        )}
        {isCalendar && (
          <TouchableOpacity onPress={handleFocus}>
            <SvgXml xml={Images.calender()} />
          </TouchableOpacity>
        )}
      </View>
      {subTitle && (
        <Text
          style={{
            fontSize: widthPercentageToDP(3),
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {subTitle}
        </Text>
      )}

      {isCalendar && isFocused && (
        <DateTimePicker
          value={new Date(value || Date.now())}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default Input;

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
});
