export interface Stock {
    currentPrice: number;
    symbol: string;
    marketCap: number;
    peRatio: number;
    sector: string;
}
export interface stockBought {
    currentPrice: number;
    symbol: string;
    refPrice: number;
    isProfit: boolean;
    profitLossPercent: number;
    profitLossDollar: number;
}
export interface Portfolio {
    netWorth: number;
    realisedProfit: number;
    currentInvWorth: number;
    top5Gainers: stockBought[];
    top5Losers: stockBought[];
}