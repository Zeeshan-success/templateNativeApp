import { AdMob } from 'expo-ads-admob';

AdMob.getDeviceIdAsync().then(id => console.log("Your Test Device ID:", id));