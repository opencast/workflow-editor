import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionItemComponent } from './condition-item.component';

describe('ConditionItemComponent', () => {
  let component: ConditionItemComponent;
  let fixture: ComponentFixture<ConditionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
