import { Images } from '@/assets/images';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg'
import { Router, useRouter } from 'expo-router';
import { useEffect } from 'react';
import AppVersion from '@/components/Version';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

export default function HomeScreen() {
    const router: Router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace({ pathname: "/login" })
        }, 2000);
    }, [])

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
