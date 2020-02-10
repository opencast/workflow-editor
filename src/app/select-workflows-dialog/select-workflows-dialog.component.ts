import { Component, OnInit } from '@angular/core';
import {Workflow} from '../models/workflow';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-select-workflows-dialog',
  templateUrl: './select-workflows-dialog.component.html',
  styleUrls: ['./select-workflows-dialog.component.scss']
})
export class SelectWorkflowsDialogComponent implements OnInit {
  allSelected: boolean;
  workflows: Workflow[];

  constructor(private workflowService: WorkflowService) {
    this.workflows = workflowService.workflows;
    this.updateSelectAll();
  }

  ngOnInit() {
  }

  updateSelectAll() {
    this.allSelected = this.workflows.every(workflow => workflow.selected === true);
  }

  removeWorkflow(index: number) {
    this.workflowService.removeWorkflow(index);
  }

  toggleSelectAll() {
    this.workflows.forEach(workflow => {workflow.selected = this.allSelected});
  }
}
