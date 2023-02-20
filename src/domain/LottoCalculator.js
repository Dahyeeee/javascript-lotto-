import { GameControlStaticValue, Rank, Prize, InitialRank } from '../constants/Constants.js';

class LottoCalculator {
  constructor(matchStates) {
    this.matchStates = matchStates;
  }

  calculateRank() {
    return this.matchStates.reduce(
      (ranks, currentState) => {
        const CURRENT_RANK = Rank[currentState];
        ranks[CURRENT_RANK] += 1;

        return ranks;
      },
      { ...InitialRank },
    );
  }

  calculateProfitRate(ranks) {
    return (
      (this.#calculateProfit(ranks) /
        (this.matchStates.length * GameControlStaticValue.PURCHASE_AMOUNT_UNIT)) *
      GameControlStaticValue.PERCENTAGE_DIVIDER
    ).toFixed(1);
  }

  #calculateProfit(ranks) {
    return Object.entries(ranks).reduce(
      (totalProfit, [rank, count]) => totalProfit + Prize[rank] * count,
      0,
    );
  }
}

export default LottoCalculator;
