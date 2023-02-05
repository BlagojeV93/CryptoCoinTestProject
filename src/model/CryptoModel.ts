export interface Crypto {
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
}

export interface FormatedCrypto {
    id: string;
    symbol: string;
    name: string;
    uri: string;
    rank: number;
    price: string;
    marketCapValue: string;
    marketChange: number;
    marketChangeValue: string;
}

