import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog/upload-workflows-dialog.component';
import { DragDropUploadDirective } from './drag-drop-upload.directive';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { SaveWorkflowsDialogComponent } from './save-workflows-dialog/save-workflows-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadWorkflowsDialogComponent,
    DragDropUploadDirective,
    WorkflowListComponent,
    SaveWorkflowsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UploadWorkflowsDialogComponent, SaveWorkflowsDialogComponent]
})
export class AppModule { }
