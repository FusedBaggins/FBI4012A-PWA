import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSettingsDetailComponent } from './sprint-settings-detail.component';

describe('SprintSettingsDetailComponent', () => {
  let component: SprintSettingsDetailComponent;
  let fixture: ComponentFixture<SprintSettingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintSettingsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintSettingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
