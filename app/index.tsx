import { Images } from '@/assets/images';
import { StyleSheet, View, SafeAreaView, Platform, Text } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg'
import { Router, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AppVersion from '@/components/Version';

import { LogBox } from 'react-native';
import { getData } from '@/lib/helpers';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function HomeScreen() {
    const router: Router = useRouter();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            fetchUser()
        }, 2000)
    }, [])

    const fetchUser = async () => {
        try {
            const result = await getData('user');
            if (result) {
                router.replace({ pathname: "/(tabs)" })
            } else {
                router.replace({ pathname: "/login" })
            }
        } catch (error) {
            console.log(error, 'error fetchUser')
        } finally {
            setLoader(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View />
            <SvgXml xml={Images.logo()} />
            <AppVersion />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { paddingBottom: Platform.OS === "android" ? heightPercentageToDP(2) : 0, flex: 1, alignItems: 'center', justifyContent: "space-between" },

});
