import { Images } from '@/assets/images';
import { StyleSheet, View, SafeAreaView, Platform, Text } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg'
import { Router, useRouter } from 'expo-router';
import { useEffect } from 'react';
import AppVersion from '@/components/Version';

import { LogBox } from 'react-native';
import { getData } from '@/lib/helpers';
import { user_role } from '@/constants/user';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function HomeScreen() {
    const router: Router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            fetchUser()
        }, 2000)
    }, [])

    const fetchUser = async () => {
        try {
            const result: any = await getData('user');
            if (result?.length) {
                if (result.role === user_role["Admin"]) {
                    router.replace({ pathname: "/adminHome" })
                } else {
                    router.replace({ pathname: "/(tabs)" })
                }
            } else {
                router.replace({ pathname: "/login" })
            }
        } catch (error) {
            console.log(error, 'error fetchUser')
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
