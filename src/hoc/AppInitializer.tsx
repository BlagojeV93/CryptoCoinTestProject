import React from 'react';
import { View } from 'react-native';

interface AppInitializerProps {
    component: React.ReactNode
}

const AppInitializer: React.FC<AppInitializerProps> = ({ component }) => {

    return (
        <View>
           {component}
        </View>
    );
}

export default AppInitializer;
