import {Tag} from './tag';
import {Operation} from './operation';
import {Role} from './role';

export interface Workflow {
  id: string;
  title?: string;
  description?: string;
  displayOrder?: number;
  configurationPanel?: string;
  tags?: Tag[];
  operations?: Operation[];
  roles?: Role[];
  selected: boolean;
  download: boolean;
}
