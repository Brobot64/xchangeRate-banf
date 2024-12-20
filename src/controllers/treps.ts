interface ExchangeRates {
  [key: string]: number | null;
}

interface CurrencyData {
  [key: string]: ExchangeRates;
}

interface Stats {
  mean: number;
  median: number;
  highestTwo: number[];
  lowestTwo: number[];
}

interface Result {
  [key: string]: Stats;
}

const data: CurrencyData = {
  // paste your data here
};

// Helper functions
const calculateMean = (rates: number[]): number => {
  return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
};

const calculateMedian = (rates: number[]): number => {
  const sorted = [...rates].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Main function to process data
export const calculateStats = (data: CurrencyData): Result => {
  const result: Result = {};

  for (const [currencyPair, ratesObj] of Object.entries(data)) {
      // Extract rates, filtering out null or zero values
      const rates = Object.values(ratesObj).filter((rate): rate is number => rate !== null && rate > 0); // Adjusted condition to exclude 0

      if (rates.length > 0) {
          // Calculate statistics
          const mean = calculateMean(rates);
          const median = calculateMedian(rates);

          // Sort rates to find highest and lowest two
          const sortedRates = [...rates].sort((a, b) => a - b);
          const lowestTwo = sortedRates.slice(0, 2);
          const highestTwo = sortedRates.slice(-2);

          result[currencyPair] = { mean, median, highestTwo, lowestTwo };
      } else {
          // If no valid rates, provide defaults
          result[currencyPair] = { mean: 0, median: 0, highestTwo: [], lowestTwo: [] };
      }
  }

  return result;
};

// Calculate and log the result
// const stats = calculateStats(data);
// console.log(stats);
