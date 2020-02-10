import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Workflow} from '../models/workflow';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-download-workflows-dialog',
  templateUrl: './download-workflows-dialog.component.html',
  styleUrls: ['./download-workflows-dialog.component.scss']
})
export class DownloadWorkflowsDialogComponent {
  isLoading = false;
  downloadDisabled = false;
  allSelected: boolean;
  workflows: Workflow[];

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<DownloadWorkflowsDialogComponent>,
              private workflowService: WorkflowService) {
    this.workflows = workflowService.workflows;
    this.updateSelectAll();
  }

  submitDownload() {
    this.isLoading = true;
    this.dialogRef.disableClose = true;
    this.downloadDisabled = true;

    this.workflowService.downloadWorkflows().catch((e) => {
      console.log(e);
      // todo: Promise Exception
    }).finally(() => {
      this.isLoading = false;
      this.dialogRef.disableClose = false;
      this.downloadDisabled = false;
      this.dialogRef.close();
    });
  }

  updateSelectAll() {
    this.allSelected = this.workflows.every(workflow => workflow.download === true);
  }

  toggleSelectAll() {
    this.workflows.forEach(workflow => {workflow.download = this.allSelected});
  }
}
