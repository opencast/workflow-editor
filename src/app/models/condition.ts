import {Operation} from './operation';
import {Workflow} from './workflow';

export interface Condition {
  value: string;
  leftParent?: Condition;
  rightParent?: Condition;
  parent?: Workflow;
  left?: (Operation | Condition)[];
  right?: (Operation | Condition)[];
}
