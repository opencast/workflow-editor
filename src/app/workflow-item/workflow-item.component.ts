import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Workflow} from '../models/workflow';
import { Options } from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Operation} from '../models/operation';
import {MatSidenav, MatTab, MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-workflow-item',
  templateUrl: './workflow-item.component.html',
  styleUrls: ['./workflow-item.component.scss']
})
export class WorkflowItemComponent implements OnInit {

  @Input() workflow: Workflow;
  selectedOperationIndex: number = null;
  editedOperation: Operation = null;
  includedWorkflow: Workflow = null;

  constructor(private workflowService: WorkflowService) {  }

  ngOnInit() {}

  editOperation(editedOperation: Operation) {
    this.editedOperation = editedOperation;
  }

  selectOperation(operationIndex: number) {
    this.selectedOperationIndex = operationIndex;
  }

  includeWorkflow(operation: Operation) {
    console.log('operation', operation);
    this.includedWorkflow = this.workflowService.getWorkflowById(
      operation.configurations.filter((configuration) => configuration.key === 'workflow-id')[0].value);
  }

  closeIncludedWorkflow() {
    this.includedWorkflow = null;
  }

  closeEdit() {
    this.editedOperation = null;
    this.selectedOperationIndex = null;
  }
}
