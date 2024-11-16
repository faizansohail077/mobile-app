import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CreateReportModalComponent from './CreateReportModal'; 

type Route = {
    name: string;
    title: string;
    activeIcon: () => void;
    inactiveIcon: () => void;
};

interface CustomTabBarProps {
    routes: Route[];
}

export function CustomTabBar({ routes }: CustomTabBarProps) {
    const router = useRouter();
    const segments: string[] = useSegments();
    const hideBottomTabBarRoutes = ['approved','communicationRecord','completed', 'hseInspection','incidentReporting', 'profile','rejected','inReview','editProfile','changePassword','notification'];
    const [createReportModalVisible, setCreateReportModalVisible] = useState(false);

    const isRouteActive = (route: string) => {
        return route === '/' ? segments.length === 1 : segments.includes(route);
    };

    const currentRoute = segments[segments.length - 1];

    if (hideBottomTabBarRoutes.includes(currentRoute)) {
        return null;
    }

    return (
        <View style={styles.container}>
            {routes.map((route: any) => {
                const isActive = isRouteActive(route.name);

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tab}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (route.name === 'createReport') {
                                setCreateReportModalVisible(true); // Show modal when plus button is pressed
                            } else {
                                router.push(route.name);
                            }
                        }}
                    >
                        {route.title ? (
                            <>
                                <SvgXml xml={isActive ? route.activeIcon() : route.inactiveIcon()} />
                                <Text style={styles.label}>{route.title}</Text>
                            </>
                        ) : (
                            <View style={styles.plusButton}>
                                <AntDesign name="plus" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}

            <CreateReportModalComponent
                modalVisible={createReportModalVisible}
                setModalVisible={setCreateReportModalVisible}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingBottom: Platform.OS === 'ios' ? heightPercentageToDP(2) : 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginTop: 4,
        fontSize: 12,
        color: 'black',
    },
    plusButton: {
        padding: 10,
        backgroundColor: Colors.primary_blue,
        borderRadius: 10,
    },
});
