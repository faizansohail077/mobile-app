import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '@/constants/Colors';
import { formatDateTime } from '@/lib/helpers';

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
  isTime = false,
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
  isTime?: boolean;
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
    if (!isCalendar && !isTime) {
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDateTimeChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'ios' || isCalendar) {
      setIsFocused(false); // Close the picker on iOS or for calendar
    }
  
    if (selectedDate) {
      if (isTime && Platform.OS === 'android' && !tempDate) {
        // First step: Store the selected date
        setTempDate(selectedDate);
      } else if (isTime && Platform.OS === 'android' && tempDate) {
        // Combine date and time for Android
        const combinedDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        );
        setValue(formatDateTime(combinedDate));
        setTempDate(null);
        setIsFocused(false);
      } else {
        // For iOS or calendar picker
        setValue(isTime ? formatDateTime(selectedDate) : selectedDate.toISOString().split('T')[0]);
      }
    } else {
      setIsFocused(false); // Dismiss picker if no date is selected
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
        {isCalendar || isTime ? (
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
        {(isCalendar || isTime) && (
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

      {isCalendar && !isTime && isFocused && (
        <DateTimePicker
          value={new Date(value || Date.now())}
          mode={isTime ? 'datetime' : 'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateTimeChange}
        />
      )}

      {isFocused && !isCalendar && isTime && (
        <>
          <DateTimePicker
            value={new Date(value || Date.now())}
            mode={isCalendar || (isTime && Platform.OS === 'ios') ? 'datetime' : 'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateTimeChange}
          />
          {isTime && Platform.OS === 'android' && tempDate && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleDateTimeChange}
            />
          )}
        </>
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
