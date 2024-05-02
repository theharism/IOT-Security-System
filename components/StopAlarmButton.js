import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const StopAlarmButton = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Button title="Stop Alarm" onPress={onPress} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

export default StopAlarmButton;
