import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArmDisarmButton from '../components/ArmDisarmButton';
import SensorStatus from '../components/SensorStatus';
import StopAlarmButton from '../components/StopAlarmButton';

const MainScreen = () => {
    const [alarmActive, setAlarmActive] = useState(true);
    const [armed, setArmed] = useState(false);
    const [stop, setStop] = useState(false)

    const handleStopAlarm = () => {
        // Add logic to stop the alarm
        setAlarmActive(false);
        setStop(true)


    };

    const handleStartAlarm = () => {
        //Logic to make make alarm true
        setAlarmActive(true);
    };

    const handleArmDisarm = () => {
        setArmed(!armed);
        // Add logic to send ARM/DISARM command to the security system
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Security System</Text>
            <ArmDisarmButton onArmDisarm={handleArmDisarm} armed={armed} />
            <SensorStatus sensor="Fence" status={armed ? 'Safe' : 'Safe'} />
            <SensorStatus sensor="Window" status={armed ? 'Safe' : 'Safe'} />
            <SensorStatus sensor="Door" status={armed ? 'Safe' : 'Safe'} />
            <SensorStatus sensor="Lawn Motion Sensor" status={armed ? 'Safe' : 'Safe'} />
            <SensorStatus sensor="Inside House Sensor" status={armed ? 'Intruder Alert' : 'Safe'} setAlarmStatus={handleStartAlarm} stopAlarm={stop} />
            {alarmActive && <StopAlarmButton onPress={handleStopAlarm} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default MainScreen;
