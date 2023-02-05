import React from 'react';
import { Text, View } from 'react-native';
import { Crypto } from '../model/CryptoModel';

interface CryptoItemProps {
    data: Crypto
}

const CryptoItem: React.FC<CryptoItemProps> = ({ data }) => {

    return (
        <View>
            <Text>{data.name}</Text>
        </View>
    );
}

export default CryptoItem;
