import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Operation} from '../models/operation';
import * as Sortable from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Workflow} from '../models/workflow';
import {Condition} from '../models/condition';

@Component({
  selector: 'app-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.scss'],
  inputs: ['includedWorkflowSplit', 'operation', 'condOperation', 'index', 'workflow', 'opCount', 'condValue'],
  outputs: ['operationSelected', 'operationEdited', 'workflowIncluded', 'operationRemoved']
})
export class OperationItemComponent implements OnInit, OnChanges {

  operation: Operation;
  condOperation: Condition;
  condValue: string;
  includedWorkflowSplit: boolean;
  index: number;
  workflow: Workflow;
  operationEdited = new EventEmitter();
  operationRemoved = new EventEmitter();
  workflowIncluded = new EventEmitter();

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.operation.if = this.condValue;
  }

  removeOperation(index: number, workflow: Workflow) {
    console.log(this.condOperation);
    if (this.operation.selected) {
      this.operation.selected = false;
    }

    if (typeof this.condOperation.leftParent !== 'undefined') {
      this.condOperation.leftParent.left.splice(index, 1);
      this.operationRemoved.emit(this.condOperation.leftParent);
    } else if (typeof this.condOperation.rightParent !== 'undefined') {
      this.condOperation.rightParent.right.splice(index, 1);
      this.operationRemoved.emit(this.condOperation.rightParent);
    } else if (typeof this.condOperation.parent !== 'undefined') {
      this.condOperation.parent.condOperations.splice(index, 1);
    }
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
