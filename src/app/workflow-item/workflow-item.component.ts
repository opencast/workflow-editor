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
  edit: any = false;
  editedOperation: Operation = null;
  includedWorkflow: Workflow = null;

  constructor(private workflowService: WorkflowService) {  }

  ngOnInit() {}

  includeWorkflow(operation: Operation) {
    this.includedWorkflow = this.workflowService.getWorkflowById(
      operation.configurations.filter((configuration) => configuration.key === 'workflow-id')[0].value);
    // todo: if no workflow found
  }

  editOperation(editedOperation: Operation) {
    this.closeEditWorkflow();
    this.workflow.operations
      .map((op) => op.selected = false);
    if (editedOperation !== null) {
      editedOperation.selected = true;
    }
    this.editedOperation = editedOperation;
  }

  editWorkflow() {
    this.closeEditOperation();
    this.edit = true;
  }

  closeIncludedWorkflow() {
    this.includedWorkflow = null;
  }

  closeEditOperation() {
    this.workflow.operations
      .map((op) => op.selected = false);
    this.editedOperation = null;
  }

  closeEditWorkflow() {
    this.edit = false;
  }
}
