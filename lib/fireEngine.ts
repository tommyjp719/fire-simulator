export type FireInput = {
  asset: number;
  expense: number;
  contribution: number;
  returnRate: number;      // 年利
  inflationRate: number;   // インフレ率
  withdrawalRate: number;  // 4%ルールなど
  maxYears?: number;
};

export type FireResult = {
  years: number;
  finalAsset: number;
  fireTarget: number;
  data: { year: number; asset: number }[];
};

export function simulateFire(input: FireInput): FireResult {
  const {
    asset,
    expense,
    contribution,
    returnRate,
    inflationRate,
    withdrawalRate,
    maxYears = 60,
  } = input;

  const realReturn =
    (1 + returnRate) / (1 + inflationRate) - 1;

  const fireTarget = expense / withdrawalRate;

  let current = asset;
  let year = 0;
  const data = [];

  while (current < fireTarget && year < maxYears) {
    current = current * (1 + realReturn) + contribution;
    year++;

    data.push({
      year,
      asset: Math.floor(current),
    });
  }

  return {
    years: year,
    finalAsset: current,
    fireTarget,
    data,
  };
}