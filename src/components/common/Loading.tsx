import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => {

    return (
        <View style={styles.mainContainer}>
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Loading;
