import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Operation} from '../models/operation';
import * as Sortable from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Workflow} from '../models/workflow';

@Component({
  selector: 'app-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.scss'],
  inputs: ['includedWorkflowSplit', 'operation', 'index', 'workflow', 'opCount', 'condValue'],
  outputs: ['operationSelected', 'operationEdited', 'workflowIncluded']
})
export class OperationItemComponent implements OnInit, OnChanges {

  operation: Operation;
  condValue: string;
  includedWorkflowSplit: boolean;
  index: number;
  workflow: Workflow;
  operationEdited = new EventEmitter();
  workflowIncluded = new EventEmitter();

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.operation.if = this.condValue;
  }

  removeOperation(index: number, workflow: Workflow) {
    if (this.operation.selected) {
      this.editOp(null);
    }
    this.workflowService.removeOperation(index, workflow);
  }

  editOp(operation: Operation) {
    this.operationEdited.emit(operation);
  }

  includeOp(operation: Operation) {
    this.workflowIncluded.emit(operation);
  }

  duplicateOp(operation: Operation) {
    // todo
  }
}
