import { StyleSheet, View, Text, Platform, TouchableOpacity, FlatList, TextInput, Animated } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { getData, removeData } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Images } from '@/assets/images';
import { tab_list } from '@/constants/user';
import { Colors } from '@/constants/Colors';
import { report_list } from '@/constants/reportData';
import { Components } from '@/components';
import { Router, useRouter } from 'expo-router';
import { ReportCard } from '@/components/Card';
import { AntDesign } from '@expo/vector-icons';


const menuOptions = [
    { text: "View Profile", goTo: "" },
    { text: "Log Out", goTo: "" },
];

export default function AdminHome() {
    const [user, setUser] = useState<any>({})
    const [loader, setLoader] = useState(true)
    const [selectedTab, setSelectedTab] = useState<any>({ id: 0, text: "reports" });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [reportData, setReportData] = useState<any>([])
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [userTabs, setUserTabs] = useState<any>([])
    const router: Router = useRouter();

    useEffect(() => {
        const filterData = report_list.filter((item) => item.type === selectedTab.text)
        setReportData(filterData)
    }, [selectedTab])

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            const userTabs2 = tab_list?.filter((item) => item.role === user.role)
            setUserTabs(userTabs2)
        }
    }, [user])

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

    const handleTabPress = (item: any) => {
        setSelectedTab(item);
    };


    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);

        if (!isMenuVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };


    const handleOptionSelect = async (option: {
        text: string;
        goTo: string;
    }) => {
        if (option.text === "Log Out") {
            await removeData("user")
            setIsMenuVisible(false);
            router.replace({ pathname: "/login" })
        } else {
            router.push({ pathname: "/profile" })

            setIsMenuVisible(false);
        }

    };


    if (loader) return <Text>Loading...</Text>

    return (
        <>
            {/* top section */}
            <View style={[styles.topContainer, { backgroundColor: user.color }]} >
                <View style={styles.topSubContainer} >
                    <View style={styles.topLeftContainer} >
                        <SvgXml xml={Images.profile()} />
                        <Text style={styles.topLeftContainerText} >Hello Leslie, you are logged in as a <Text style={{ fontWeight: 'bold' }} >{user?.role?.replace("-", " ")}</Text></Text>
                    </View>
                    <View style={{ width: "10%" }} />
                    <View style={styles.topRightContainer} >
                        <TouchableOpacity onPress={() => router.push({ pathname: '/notification' })}>
                            <SvgXml xml={Images.notification()} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleMenu}>
                            <SvgXml xml={Images.menu()} />
                        </TouchableOpacity>
                        <Animated.View style={[styles.dropdown, { opacity: fadeAnim }]}>
                            {isMenuVisible && menuOptions?.map((item, index) => {

                                return (
                                    <>
                                        {index == menuOptions.length - 1 && <View style={{ height: 1, backgroundColor: 'rgba(208, 213, 221, 1)' }} />}
                                        <TouchableOpacity onPress={() => handleOptionSelect(item)} style={styles.option}>
                                            <Text style={[styles.optionText, { color: item?.text === "Log Out" ? Colors.red : 'black' }]}>{item?.text}</Text>
                                        </TouchableOpacity>
                                    </>

                                )
                            })}
                        </Animated.View>

                    </View>
                </View>
            </View>


            <View style={styles.bottomContainer} >

                {/* reports */}
                <View style={{ height: heightPercentageToDP(75), paddingBottom: heightPercentageToDP(2) }} >
                    {["LTA PL208 - CYCLING PATH", "LTA TR359 - SILVERZONE", "HDB - BEDOK & CHAI CHEE INFRA WORKS"].map((item) => {
                        return (
                            <TouchableOpacity onPress={() => { router.push({ pathname: '/(tabs)/', params: { title: item } }) }} style={styles.container} activeOpacity={0.7}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                    <Text style={styles.idText} >{item}</Text>
                                    <AntDesign name="right" size={16} color={Colors.primary_blue} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <Components.FilterModalComponent modalVisible={filterModalVisible} setModalVisible={setFilterModalVisible} />

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
        paddingHorizontal: widthPercentageToDP(3), gap: 10
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
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        // padding: 10,
        width: widthPercentageToDP(45),
        zIndex: 30000
    },
    option: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10
    },

    tab: {
        minWidth: widthPercentageToDP(30),
        paddingVertical: heightPercentageToDP(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderBottomWidth: 2
    },
    activeTab: {
        borderBottomColor: Colors.primary_blue
    },
    inactiveTab: {
        borderBottomColor: Colors.white

    },
    activeTabText: {
        color: Colors.primary_blue,
    },
    inactiveTabText: {
        color: Colors.light_black,
    },
    tabText: {
        color: Colors.white,
        fontWeight: '500',
    },
    bottomContainer: { zIndex: -1, paddingHorizontal: widthPercentageToDP(3), paddingVertical: heightPercentageToDP(2), gap: 5 },
    searchBarMainContainer: { flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' },
    searchBox: { backgroundColor: Colors.white, borderWidth: 2, borderColor: 'rgba(208, 213, 221, 1)', borderRadius: 10, width: '90%', paddingHorizontal: widthPercentageToDP(2), height: heightPercentageToDP(5), alignContent: 'center', flexDirection: 'row', gap: 5, alignItems: 'center' },
    container: { gap: 10, paddingHorizontal: widthPercentageToDP(5), paddingVertical: heightPercentageToDP(2), backgroundColor: Colors.white, marginTop: 10 },
    idText: { fontWeight: 'bold', width: "80%", fontSize: widthPercentageToDP(4) },
});
