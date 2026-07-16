import { SubjectGroup } from './subject-group.model';

export class GroupA00 extends SubjectGroup {
  readonly code = 'A00';
  readonly name = 'Math, Physics, Chemistry';
  readonly subjects = ['toan', 'vat_li', 'hoa_hoc'];
}

export const SUBJECT_GROUPS: SubjectGroup[] = [
  new GroupA00()
];
