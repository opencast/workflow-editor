import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkflowsDialogComponent } from './select-workflows-dialog.component';

describe('SelectWorkflowsDialogComponent', () => {
  let component: SelectWorkflowsDialogComponent;
  let fixture: ComponentFixture<SelectWorkflowsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWorkflowsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWorkflowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
