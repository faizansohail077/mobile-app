import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { getData } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';

export default function HomeScreen() {
  const [user, setUser] = useState<any>({})
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const result = await getData('user');
      setUser(result)
    } catch (error) {
      console.log(error, 'error fetchUser')
    } finally {
      setLoader(false)
    }
  }

  if (loader) return <Text>Loading...</Text>

  return (
    <>
      <View style={[styles.topContainer, { backgroundColor: user.color }]} >
        <View style={styles.topSubContainer} >
          <View style={styles.topLeftContainer} >
            <SvgXml xml={Images.profile()} />
            <Text style={styles.topLeftContainerText} >Hello Leslie, you are logged in as a <Text style={{ fontWeight: 'bold' }} >{user?.role?.replace("-", " ")}</Text></Text>
          </View>
          <View style={{ width: "10%" }} />
          <View style={styles.topRightContainer} >
            <TouchableOpacity>
              <SvgXml xml={Images.notification()} />
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgXml xml={Images.menu()} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: heightPercentageToDP(15),
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? heightPercentageToDP(5) : heightPercentageToDP(7)
  },
  topSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(2), gap: 10
  },
  topLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: "70%"
  },
  topLeftContainerText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: widthPercentageToDP(4)
  },
  topRightContainer: {
    width: "20%",
    flexDirection: 'row',
    alignItems: 'center', gap: 10
  }
});
