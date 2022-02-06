import './style.css'

import { parseSentences, Sentence, RuleElement } from './parser';
import { makePrediction } from './system';
import { drawPrediction } from './renderer';

const $inputRules = document.getElementById<HTMLInputElement>('input-rules')!;
const $inputConclusions = document.getElementById<HTMLInputElement>('input-conclusions')!;
const $buttonGenerate = document.getElementById<HTMLButtonElement>('button-generate')!;
const $ruleSelector = document.getElementById<HTMLDivElement>('rule-selector')!;

$buttonGenerate.addEventListener('click', (event) => {
  event.preventDefault();

  const sentences = parseSentences($inputRules.value);

  const onSelection = (s: Sentence) => {
    try {
      const result = makePrediction(sentences, s);

      const makeLine = (text: string) => `${text}\n`;
      const formatImplication = (s: RuleElement) => {
        let is = s.isNegated ? 'no esta' : 'esta';
        return `${s.subject} ${is} en ${s.withoutNegation}`;
      }


      let text = makeLine(`${s.rule.subject} esta en ${s.rule.destiny}`);
      for (const i of result.implications) {
        text += makeLine(formatImplication(i.implication));
      }

      text += makeLine('');
      text += makeLine(result.isPossibleSolution ? 'Resultado: es una posible solución' : `Resultado: no es una solución, debido a que: ${result.reason}`);

      $inputConclusions.value = text;
      drawPrediction(result);
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered = sentences.filter(s => !s.rule.isNegated);
  for (const s of filtered) {
    const container = document.createElement<HTMLDivElement>('div');

    const label = document.createElement<HTMLLabelElement>('label');
    label.textContent = s.toString();

    const input = document.createElement<HTMLInputElement>('input');
    input.setAttribute('name', 'option');
    input.setAttribute('type', 'radio');
    input.setAttribute('value', s.toString());
    input.addEventListener('click', () => onSelection(s));

    container.appendChild(input);
    container.appendChild(label);

    $ruleSelector.appendChild(container);
  }
});
