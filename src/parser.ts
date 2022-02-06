export class RuleElement {
  private subject_: string;
  private destiny_: string;

  constructor(subject: string, destiny: string) {
    this.subject_ = subject;
    this.destiny_ = destiny;
  }

  get isNegated() {
    return this.destiny_.startsWith('-');
  }

  get subject() {
    return this.subject_;
  }

  get destiny() {
    return this.destiny_;
  }

  get withoutNegation() {
    return this.destiny_.replace('-', '');
  }

  toString() {
    return `${this.subject_}/${this.destiny_}`;
  }
}

export class Sentence {
  constructor(
    private rule_: RuleElement,
    private implication_: RuleElement,
  ) {}

  get rule() {
    return this.rule_;
  }

  get implication() {
    return this.implication_;
  }

  toString() {
    return `${this.rule_.toString()} -> ${this.implication_.toString()}`;
  }
}

export function parseRule(text: string): RuleElement {
  const [subject, destiny] = text.split('/');

  return new RuleElement(subject, destiny);
}

type Sentence = {
  rule: RuleElement;
  implication: RuleElement;
}

export function parseSentences(text: string): Array<Sentence> {
  if (text.length === 0) return [];

  const rules = text.split(/\n/).filter(s => s.length > 0);

  return rules.map(rule => {
    const withoutSpaces = rule.replace(/\s/g, '');
    const [r, i] = withoutSpaces.split('->');

    return new Sentence(parseRule(r), parseRule(i));
  });
}

