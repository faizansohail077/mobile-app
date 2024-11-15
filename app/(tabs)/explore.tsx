import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container} >
      <View><Text>Explore</Text></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: Platform.OS === "android" ? heightPercentageToDP(5) : 0
  }
});