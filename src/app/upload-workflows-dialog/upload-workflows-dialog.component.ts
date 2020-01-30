import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-workflows-dialog',
  templateUrl: './upload-workflows-dialog.component.html',
  styleUrls: ['./upload-workflows-dialog.component.css']
})
export class UploadWorkflowsDialogComponent {
  @Input() isLoading = false;
  @Output() extractFiles = new EventEmitter();
  files: any = [];

  uploadFile(event) {
    for (const element of event) {
      if (element.type === 'application/zip' || element.type === 'text/xml') {
        this.files.push(element);
      } else {
        // todo: Warning
      }
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  submitUpload() {
    this.extractFiles.emit(this.files);
    // console.log(this.files);
  }
}
