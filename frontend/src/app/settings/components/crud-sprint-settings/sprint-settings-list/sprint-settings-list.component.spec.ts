import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSettingsListComponent } from './sprint-settings-list.component';

describe('SprintSettingsListComponent', () => {
  let component: SprintSettingsListComponent;
  let fixture: ComponentFixture<SprintSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintSettingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
