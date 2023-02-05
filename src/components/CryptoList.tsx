import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import CryptoItem from './CryptoItem';
import Api from '../service/api'
import { Crypto } from '../model/CryptoModel';
import Loading from './Loading';
import { removePossibleDuplicateItems } from '../helpers/ArrayHelper';
import COLORS from '../helpers/colors';

interface CryptoListProps {

}

const CryptoList: React.FC<CryptoListProps> = () => {
    const [coinsList, setCoinsList] = useState<Crypto[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Api.init()
        fetchCryptoData()
    }, [])

    const fetchCryptoData = async () => {
        setLoading(true)
        let page = 1
        if (coinsList.length) {
            page = Math.ceil((coinsList.length / 100) + 1)
        }
        try {
            const newData = await Api.getEndpoints().getCoinsInformation(page)
            setCoinsList(prevState => removePossibleDuplicateItems(prevState, newData))
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

    const renderContent = () => {
        if (coinsList.length) {
            return (
                <FlatList
                    contentContainerStyle={styles.listStyle}
                    data={coinsList}
                    renderItem={({ item }) => <CryptoItem data={item} />}
                    keyExtractor={(item) => item.id}
                    onEndReached={() => fetchMoreData()}
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
    }
})

export default CryptoList;
