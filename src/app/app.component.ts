import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog/upload-workflows-dialog.component';
import {WorkflowService} from './services/workflow-service/workflow.service';
import {SaveWorkflowsDialogComponent} from './save-workflows-dialog/save-workflows-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog,
              private workflowService: WorkflowService) {}

  openUploadDialog(): void {
    this.dialog.open(UploadWorkflowsDialogComponent, { });
  }

  openSaveDialog(): void {
    this.dialog.open(SaveWorkflowsDialogComponent, { });
  }
}
