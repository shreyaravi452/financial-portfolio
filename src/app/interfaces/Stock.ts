export interface Stock {
    currentPrice: number;
    symbol: string;
    name: string;
    marketCap: number;
    peRatio: number;
    sector: string;
}
export interface StockBought {
    currentPrice: number;
    symbol: string;
    name: string;
    refPrice: number;
    isProfit: boolean;
    profitLossPercent: number;
    profitLossDollar: number;
    sector: string;
}
export interface Portfolio {
    netWorth: number;
    realisedProfit: number;
    currentInvWorth: number;
    top5Gainers: StockBought[];
    top5Losers: StockBought[];
}
export interface Holding {
    quantity: string;
    symbol: string;
    weighted_average_price: string;
}
export interface TransactionEntry {
    symbol: string;
    name: string;
    action: string;
    quantity: number;
    bsPrice: number;
    currPrice: number;
    // date: string;
    // time: string;
}