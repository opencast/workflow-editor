import {Tag} from './tag';
import {Operation} from './operation';
import {Role} from './role';
import {Condition} from './condition';

export interface Workflow {
  id: string;
  title?: string;
  description?: string;
  displayOrder?: number;
  configurationPanel?: string;
  tags?: Tag[];
  operations?: Operation[];
  condOperations?: Condition[];
  roles?: Role[];
  selected: boolean;
  download: boolean;
}
