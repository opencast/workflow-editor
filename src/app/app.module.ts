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
import { DownloadWorkflowsDialogComponent } from './download-workflows-dialog/download-workflows-dialog.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatCardModule, MatChipsModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import { WorkflowItemComponent } from './workflow-item/workflow-item.component';
import { OperationItemComponent } from './operation-item/operation-item.component';
import {SortablejsModule} from 'ngx-sortablejs';
import { DefaultOperationListComponent } from './default-operation-list/default-operation-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectWorkflowsDialogComponent } from './select-workflows-dialog/select-workflows-dialog.component';
import {AngularSplitModule} from 'angular-split';
import { EditOperationComponent } from './edit-operation/edit-operation.component';
import { EditWorkflowComponent } from './edit-workflow/edit-workflow.component';
import {MonacoEditorModule} from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    UploadWorkflowsDialogComponent,
    DragDropUploadDirective,
    WorkflowListComponent,
    DownloadWorkflowsDialogComponent,
    WorkflowItemComponent,
    OperationItemComponent,
    DefaultOperationListComponent,
    SelectWorkflowsDialogComponent,
    EditOperationComponent,
    EditWorkflowComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule.forRoot(),
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatListModule,
    MatSidenavModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SortablejsModule.forRoot({
      animation: 150,
      group: {
        name: 'shared'
      },
      fallbackOnBody: true,
      swapThreshold: 0.65
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UploadWorkflowsDialogComponent, DownloadWorkflowsDialogComponent, SelectWorkflowsDialogComponent]
})
export class AppModule { }
