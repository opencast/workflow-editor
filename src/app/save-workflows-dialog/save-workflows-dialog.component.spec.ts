import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkflowsDialogComponent } from './save-workflows-dialog.component';

describe('SaveWorkflowsDialogComponent', () => {
  let component: SaveWorkflowsDialogComponent;
  let fixture: ComponentFixture<SaveWorkflowsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveWorkflowsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWorkflowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
