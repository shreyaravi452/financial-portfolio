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