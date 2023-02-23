import { Event, QuerySelector } from '../constants/HTML';
import { $, $$ } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class ResultModal {
  constructor() {
    this.resultModal = $(QuerySelector.RESULT_MODAL);
  }

  #paintRankEl(ranks) {
    const rank = [1, 2, 3, 4, 5];
    rank.forEach((each) => {
      $(`.rank_${each}`).innerText = Convertor.resultNumber(ranks[each]);
    });
  }

  #paintProfitRate(profitRate) {
    const profitMessage = Convertor.profitRateResult(profitRate);
    $(QuerySelector.PROFIT_MESSAGE).innerText = profitMessage;
  }

  render(rank, profitRate) {
    this.#paintRankEl(rank);
    this.#paintProfitRate(profitRate);

    this.resultModal.setAttribute('open', '');
  }

  activate() {
    $(QuerySelector.MODAL_CLOSE_BUTTON).addEventListener(Event.CLICK, () => {
      this.#close();
    });

    $(QuerySelector.RESTART_BUTTON).addEventListener(Event.CLICK, () => {
      this.#resetGame();
      this.#close();
    });
  }

  #close() {
    this.resultModal.removeAttribute('open');
  }

  #resetGame() {
    $(QuerySelector.MONEY_INPUT).value = '';
    $(QuerySelector.LOTTO_LIST_FIELD).innerText = '';
    $('.content').classList.remove('height_auto');
    $(QuerySelector.LOTTO_INPUT_FIELD).classList.remove('show');
    $$(QuerySelector.WINNING_NUMBER).forEach((each) => {
      each.value = '';
    });
    $(QuerySelector.BONUS_NUMBER).value = '';
  }
}

export default ResultModal;
