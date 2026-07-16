export abstract class SubjectGroup {
  abstract readonly code: string;
  abstract readonly name: string;
  abstract readonly subjects: string[]; // e.g., ['toan', 'vat_li', 'hoa_hoc']
}
