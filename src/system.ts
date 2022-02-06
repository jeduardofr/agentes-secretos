import { Sentence } from './parser';

export type Prediction = {
  sentence: Sentence;
  implications: Array<Sentence>;
  isPossibleSolution: boolean;
  reason: string;
}

function findNegatedRules(rules: Array<Sentence>, s: Sentence): Array<Sentence> {
  return rules.filter(
    e => e.rule.subject === s.rule.subject && e.rule.isNegated && e.rule.withoutNegation !== s.rule.destiny
  );
}

export function makePrediction(rules: Array<Sentence>, sentence: Sentence): Prediction {
  const prediction = { 
    sentence,
    implications: [],
    isPossibleSolution: true,
    reason: ''
  };

  if (sentence.rule.isNegated) {
    throw new Error('Missing implementation for when subject is not in a given place');
  }

  const results = findNegatedRules(rules, sentence);
  let isPossibleSolution = true;
  let reason = '';
  for (let i = 0; i < results.length; ++i) {
    for (let j = i + 1; j < results.length; ++j) {
      if (results[i].implication.subject === results[j].implication.subject) {
        reason = `La regla ${results[i].toString()} tiene a la misma persona que ${results[j].toString()} en la implicación`;
        isPossibleSolution = false;
        break;
      }

      if (results[i].implication.destiny === results[j].implication.destiny) {
        reason = `La regla ${results[i].toString()} tiene el mismo destino que ${results[j].toString()} en la implicación`;
        isPossibleSolution = false;
        break;
      }
    }

    if (!isPossibleSolution) break;
  }

  prediction.implications = results;
  prediction.isPossibleSolution = isPossibleSolution;
  prediction.reason = reason;
  return prediction;
}

