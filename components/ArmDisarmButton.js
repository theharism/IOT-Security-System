import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ArmDisarmButton = ({ onArmDisarm, armed }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Security System:</Text>
            <Button
                title={armed ? 'DISARM' : 'ARM'}
                onPress={onArmDisarm}
                color={armed ? 'red' : 'green'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        marginRight: 10,
        fontSize: 18,
    },
});

export default ArmDisarmButton;
