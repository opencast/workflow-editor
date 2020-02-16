import { Component } from '@angular/core';
import { WorkflowService } from '../services/workflow-service/workflow.service';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-upload-workflows-dialog',
  templateUrl: './upload-workflows-dialog.component.html',
  styleUrls: ['./upload-workflows-dialog.component.scss']
})
export class UploadWorkflowsDialogComponent {
  isLoading = false;
  uploadDisabled = false;
  files: any = [];

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<UploadWorkflowsDialogComponent>,
              private workflowService: WorkflowService) {}

  uploadFile(event) {
    for (const element of event) {
      if (element.type === 'application/zip' || element.type === 'text/xml') {
        this.files.push(element);
      } else {
        // todo: Warning
      }
    }
  }

  removeFile(index) {
    this.files.splice(index, 1);
  }

  submitUpload() {
    const uploadPromises: Promise<void>[] = [];

    this.isLoading = true;
    this.dialogRef.disableClose = true;
    this.uploadDisabled = true;

    this.files.forEach((fileElement) => {
      if (fileElement.type === 'application/zip') {
        uploadPromises.push(this.workflowService.unzipFiles(fileElement));
      } else if (fileElement.type === 'text/xml') {
        uploadPromises.push(this.workflowService.readUploadedXmlFileAsText(fileElement));
      } else {
        // todo: Warning see uploadFile
      }
    });

    Promise.all(uploadPromises)
      .then(() => {
        this.dialogRef.close();
      })
      .catch((e) => {
        console.log(e);
        // todo: Promise Exception
      })
      .finally(() => {
        this.isLoading = false;
        this.dialogRef.disableClose = false;
        this.uploadDisabled = false;
      });
  }
}
