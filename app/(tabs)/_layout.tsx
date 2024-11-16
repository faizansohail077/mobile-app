import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from '@/components/CustomTabBar';
import { Images } from '@/assets/images';


const routes = [
  {
    name: '/',
    title: 'Home',
    activeIcon: Images.activeHome,
    inactiveIcon: Images.inActiveHome,
  },
  {
    name: 'createReport',
    title: '',
    activeIcon: Images.activeHome,
    inactiveIcon: Images.inActiveHome,
  },
  {
    name: 'document',
    title: 'Document',
    activeIcon: Images.activeDocument,
    inactiveIcon: Images.inActiveDocument,
  },
];


export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}>
        {routes.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
            }}
          />
        ))}
      </Tabs>
      <CustomTabBar
        routes={routes}
      />
    </>

  );
};
