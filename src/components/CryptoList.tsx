import React from 'react';
import { View } from 'react-native';
import CryptoItem from './CryptoItem';

interface CryptoListProps {

}

const CryptoList: React.FC<CryptoListProps> = () => {

    return (
        <View>
            <CryptoItem />
        </View>
    );
}

export default CryptoList;
