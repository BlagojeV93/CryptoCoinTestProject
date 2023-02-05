import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../helpers/styles/Colors';
import { FormatedCrypto } from '../../model/CryptoModel';

interface CryptoItemProps {
    data: FormatedCrypto
}

const CryptoItem: React.FC<CryptoItemProps> = ({ data }) => {

    const {
        name,
        symbol,
        uri,
        rank,
        price,
        marketCapValue,
        marketChange,
        marketChangeValue
    } = data

    const renderMarketChangePercentage = () => {
        const positiveMarketChange = marketChange >= 0
        const textStyle = positiveMarketChange ? styles.ascendingPercentageText : styles.descendingPercentageText
        const dynamicIndicatorStyles = positiveMarketChange ? styles.indicatorUp : styles.indicatorDown
        return (
            <View style={styles.marketChangeContainer}>
                <View style={[styles.indicator, dynamicIndicatorStyles]} />
                <Text style={textStyle}>{marketChangeValue}</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Image style={styles.cryptoImage} source={{ uri }} />
            <View style={styles.cryptoDataMainContainer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.cryptoOtherInfo}>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>
                    <Text style={styles.symbolText}>{symbol}</Text>
                    {renderMarketChangePercentage()}
                </View>
            </View>
            <View style={styles.marketValuesContainer}>
                <Text style={styles.valueText}>{price}</Text>
                <Text style={styles.valueText}>{marketCapValue}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.border,
        borderBottomWidth: 2,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    cryptoImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    cryptoDataMainContainer: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    cryptoOtherInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rankContainer: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 5,
        backgroundColor: COLORS.secondaryBg
    },
    rankText: {
        color: COLORS.white
    },
    symbolText: {
        color: COLORS.white,
        textTransform: 'uppercase',
        marginLeft: 5
    },
    marketChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    descendingPercentageText: {
        color: COLORS.descColor,
        fontSize: 16
    },
    ascendingPercentageText: {
        color: COLORS.ascCorlor,
        fontSize: 16
    },
    indicator: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        marginHorizontal: 5
    },
    indicatorUp: {
        borderBottomColor: COLORS.ascCorlor,
    },
    indicatorDown: {
        borderBottomColor: COLORS.descColor,
        transform: [{ rotate: "180deg" }]
    },
    marketValuesContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-end'
    },
    valueText: {
        color: COLORS.white,
        fontSize: 16
    }
})

export default memo(CryptoItem);
