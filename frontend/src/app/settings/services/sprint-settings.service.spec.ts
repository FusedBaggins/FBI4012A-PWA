import { TestBed } from '@angular/core/testing';

import { SprintSettingsService } from './sprint-settings.service';

describe('SprintSettingsService', () => {
  let service: SprintSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
