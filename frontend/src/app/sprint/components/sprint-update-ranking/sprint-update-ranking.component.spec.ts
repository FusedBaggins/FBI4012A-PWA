import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUpdateRankingComponent } from './sprint-update-ranking.component';

describe('SprintUpdateRankingComponent', () => {
  let component: SprintUpdateRankingComponent;
  let fixture: ComponentFixture<SprintUpdateRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintUpdateRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintUpdateRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
