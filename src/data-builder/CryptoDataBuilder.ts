import { convertToInternationalCurrencySystem } from "../helpers/MarketCapHelper";
import { Crypto, FormatedCrypto } from "../model/CryptoModel";

export class CryptoBuilder {
    private _cryptoArray: FormatedCrypto[];

    constructor() {
        this._cryptoArray = []
    }

    formatAll(rawData: Crypto[]): CryptoBuilder {
        this._cryptoArray = rawData.map(item => {
            return {
                id: item.id,
                symbol: item.symbol,
                name: item.name,
                uri: item.image,
                price: item.current_price?.toLocaleString(),
                rank: item.market_cap_rank,
                marketCapValue: `MCap ${convertToInternationalCurrencySystem(item.market_cap)}`,
                marketChange: item.market_cap_change_percentage_24h,
                marketChangeValue: `${(+item.market_cap_change_percentage_24h).toFixed(2)}%`
            }
        })

        return this;
    }

    build() {
        return this._cryptoArray
    }
}