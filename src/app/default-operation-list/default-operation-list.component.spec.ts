import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultOperationListComponent } from './default-operation-list.component';

describe('DefaultOperationListComponent', () => {
  let component: DefaultOperationListComponent;
  let fixture: ComponentFixture<DefaultOperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultOperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
