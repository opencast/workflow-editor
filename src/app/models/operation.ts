import {Configuration} from './configuration';

export interface Operation {
  id?: string;
  if?: string;
  description?: string;
  retryStrategy?: string;
  maxAttemps?: number;
  failOnError?: string;
  exceptionHandlerWorkflow?: string;
  configurations?: Configuration[];
  selected: boolean;
}
