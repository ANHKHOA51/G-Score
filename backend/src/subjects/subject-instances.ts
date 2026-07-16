import { Subject } from './subject.model';

export class MathSubject extends Subject {
  readonly code = 'toan';
  readonly name = 'Math';
}

export class LiteratureSubject extends Subject {
  readonly code = 'ngu_van';
  readonly name = 'Literature';
}

export class ForeignLanguageSubject extends Subject {
  readonly code = 'ngoai_ngu';
  readonly name = 'Foreign Language';
}

export class PhysicsSubject extends Subject {
  readonly code = 'vat_li';
  readonly name = 'Physics';
}

export class ChemistrySubject extends Subject {
  readonly code = 'hoa_hoc';
  readonly name = 'Chemistry';
}

export class BiologySubject extends Subject {
  readonly code = 'sinh_hoc';
  readonly name = 'Biology';
}

export class HistorySubject extends Subject {
  readonly code = 'lich_su';
  readonly name = 'History';
}

export class GeographySubject extends Subject {
  readonly code = 'dia_li';
  readonly name = 'Geography';
}

export class CivicsSubject extends Subject {
  readonly code = 'gdcd';
  readonly name = 'Civic Education';
}

export const SUBJECTS: Subject[] = [
  new MathSubject(),
  new LiteratureSubject(),
  new ForeignLanguageSubject(),
  new PhysicsSubject(),
  new ChemistrySubject(),
  new BiologySubject(),
  new HistorySubject(),
  new GeographySubject(),
  new CivicsSubject()
];
