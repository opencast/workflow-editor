import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog/upload-workflows-dialog.component';
import {WorkflowService} from './services/workflow-service/workflow.service';
import {DownloadWorkflowsDialogComponent} from './download-workflows-dialog/download-workflows-dialog.component';
import {Workflow} from './models/workflow';
import {SelectWorkflowsDialogComponent} from './select-workflows-dialog/select-workflows-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  workflows: Workflow[];

  constructor(private dialog: MatDialog,
              private workflowService: WorkflowService) {
    this.workflows = this.workflowService.workflows;
  }

  openUploadDialog(): void {
    this.dialog.open(UploadWorkflowsDialogComponent, { });
  }

  openDownloadDialog(): void {
    this.dialog.open(DownloadWorkflowsDialogComponent, { });
  }

  openSelectDialog(): void {
    this.dialog.open(SelectWorkflowsDialogComponent, { });
  }

  addNewWorkflow(): void {
    this.workflowService.initNewWorkflow();
  }
}
