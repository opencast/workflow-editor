import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Workflow} from '../models/workflow';

@Component({
  selector: 'app-save-workflows-dialog',
  templateUrl: './save-workflows-dialog.component.html',
  styleUrls: ['./save-workflows-dialog.component.css']
})
export class SaveWorkflowsDialogComponent {
  isLoading = false;
  workflows: Workflow[];

  constructor(private workflowService: WorkflowService) {
    console.log(workflowService.workflows);
    this.workflows = workflowService.workflows;
  }

  submitSave() {
    this.workflowService.saveWorkflows();
  }
}
