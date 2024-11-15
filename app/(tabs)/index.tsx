import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { logged_user } from '@/lib/user';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function HomeScreen() {
  console.log(logged_user, 'logged_user')
  return (
    <SafeAreaView style={styles.container} >
      <View><Text>123</Text></View>
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
