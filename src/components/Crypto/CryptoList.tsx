import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import CryptoItem from './CryptoItem';
import Api from '../../service/api'
import { FormatedCrypto } from '../../model/CryptoModel';
import Loading from '../common/Loading';
import { removePossibleDuplicateItems } from '../../helpers/ArrayHelper';
import COLORS from '../../helpers/styles/Colors';
import { CryptoBuilder } from '../../data-builder/CryptoDataBuilder';

const CryptoList: React.FC = () => {
    const [coinsList, setCoinsList] = useState<FormatedCrypto[]>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Api.init()
        fetchCryptoData()
    }, [])

    const fetchCryptoData = async () => {
        setLoading(true)
        let page = 1
        if (coinsList?.length) {
            page = Math.ceil((coinsList?.length / 100) + 1)
        }
        try {
            const rawData = await Api.getEndpoints().getCoinsInformation(page)
            const newData = new CryptoBuilder().formatAll(rawData).build()
            setCoinsList((prevState = []) => removePossibleDuplicateItems(prevState, newData))
        } catch (error) {
            console.log(error)
            showErrAlertAndTryAgain()
        }
        setLoading(false)
    }

    const showErrAlertAndTryAgain = () => {
        Alert.alert('An error occured', 'Please try again', [{ text: 'OK', onPress: () => fetchCryptoData() }])
    }

    const fetchMoreData = () => {
        if (!loading) {
            fetchCryptoData()
        }
    }

    const loadMoreIndicator = () => {
        if (loading) {
            return (
                <View style={styles.loadMoreIndicatorContainer}>
                    <Loading />
                </View>
            )
        }
    }

    const noDataLoaded = () => {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.titleText}>No data retrieved</Text>
            </View>
        )
    }

    const renderContent = () => {
        if (coinsList) {
            return (
                <FlatList
                    contentContainerStyle={styles.listStyle}
                    data={coinsList}
                    renderItem={({ item }) => <CryptoItem data={item} />}
                    keyExtractor={(item) => item.id}
                    onEndReached={() => fetchMoreData()}
                    ListEmptyComponent={() => noDataLoaded()}
                    ListFooterComponent={loadMoreIndicator()}
                />
            )
        }

        return <Loading />
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Top Assets</Text>
            {renderContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    titleText: {
        color: COLORS.white,
        margin: 15,
        fontSize: 22
    },
    listStyle: {
        flexGrow: 1
    },
    loadMoreIndicatorContainer: {
        marginVertical: 10
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CryptoList;
