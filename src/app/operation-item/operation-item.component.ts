import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Operation} from '../models/operation';
import * as Sortable from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Workflow} from '../models/workflow';

@Component({
  selector: 'app-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.scss'],
  inputs: ['includedWorkflowSplit', 'operation', 'index', 'workflow', 'opCount'],
  outputs: ['operationSelected', 'operationEdited', 'workflowIncluded']
})
export class OperationItemComponent implements OnInit {

  operation: Operation;
  includedWorkflowSplit: boolean;
  index: number;
  workflow: Workflow;
  operationEdited = new EventEmitter();
  workflowIncluded = new EventEmitter();

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {}

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
}
