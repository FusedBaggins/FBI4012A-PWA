import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintFilterComponent } from './sprint-filter.component';

describe('SprintFilterComponent', () => {
  let component: SprintFilterComponent;
  let fixture: ComponentFixture<SprintFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
