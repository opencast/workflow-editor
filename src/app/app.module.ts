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
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
import { ConditionItemComponent } from './condition-item/condition-item.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {APPLICATION_VALIDATORS} from './directives/validators.directive';
import { ShowErrorComponent } from './show-error/show-error.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { SearchPipe } from './search.pipe';

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
    EditWorkflowComponent,
    ConditionItemComponent,
    APPLICATION_VALIDATORS,
    ShowErrorComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AngularSplitModule.forRoot(),
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
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
