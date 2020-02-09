import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog/upload-workflows-dialog.component';
import {WorkflowService} from './services/workflow-service/workflow.service';
import {SaveWorkflowsDialogComponent} from './save-workflows-dialog/save-workflows-dialog.component';
import {Workflow} from './models/workflow';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  openSaveDialog(): void {
    this.dialog.open(SaveWorkflowsDialogComponent, { });
  }
}
