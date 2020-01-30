import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog.component';

describe('UploadWorkflowsDialogComponent', () => {
  let component: UploadWorkflowsDialogComponent;
  let fixture: ComponentFixture<UploadWorkflowsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWorkflowsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWorkflowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
