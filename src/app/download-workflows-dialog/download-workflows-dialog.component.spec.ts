import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWorkflowsDialogComponent } from './download-workflows-dialog.component';

describe('DownloadWorkflowsDialogComponent', () => {
  let component: DownloadWorkflowsDialogComponent;
  let fixture: ComponentFixture<DownloadWorkflowsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadWorkflowsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadWorkflowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
