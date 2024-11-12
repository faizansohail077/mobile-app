import { Images } from '@/assets/images';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg'
import { Router, useRouter } from 'expo-router';
import { useEffect } from 'react';

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
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomText1} >PTW Management Portal</Text>
                <Text style={styles.bottomText2}>v1.1.0</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { paddingBottom: Platform.OS === "android" ? heightPercentageToDP(2) : 0, flex: 1, alignItems: 'center', justifyContent: "space-between" },
    bottomContainer: { flexDirection: 'column', gap: 2, alignItems: 'center' },
    bottomText1: { color: "rgba(117, 117, 117, 1)", fontWeight: 'bold', fontSize: widthPercentageToDP(3) },
    bottomText2: { color: "rgba(117, 117, 117, 1)", fontSize: widthPercentageToDP(3.5) },
});
