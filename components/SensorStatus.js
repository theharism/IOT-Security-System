import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Audio } from 'expo-av'; // Import Audio from Expo AV for playing sounds


let alarmSound = null;

const SensorStatus = ({ sensor, status, setAlarmStatus }) => {
    // State to store the current status
    //const [status, setStatus] = useState('Safe');

    // Function to play alarm sound
    const playAlarmSound = async () => {
        if (!alarmSound) {
            const { sound } = await Audio.Sound.createAsync(require('../assets/alarm.wav'));
            alarmSound = sound;
            await alarmSound.playAsync();
        } else {
            // If sound is already playing, resume it
            await alarmSound.replayAsync();
        }
    };

    // Function to stop alarm sound
    const stopAlarmSound = async () => {
        if (alarmSound) {
            await alarmSound.stopAsync();
        }
    };

    useEffect(() => {
        // Start or stop alarm sound based on status change
        if (status === 'Intruder Alert') {

            playAlarmSound();
        } else {
            stopAlarmSound();
        }
    }, [status]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{sensor}:</Text>
            <Text style={[styles.status, status === 'Intruder Alert' ? styles.alert : null]}>
                {status}
            </Text>
            {status === 'Intruder Alert' && (
                <Image source={require('../assets/alarm.gif')} style={styles.alarmIcon} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        fontSize: 16,
    },
    status: {
        fontSize: 16,
    },
    alert: {
        color: 'red',
    },
    alarmIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
});

export default SensorStatus;
