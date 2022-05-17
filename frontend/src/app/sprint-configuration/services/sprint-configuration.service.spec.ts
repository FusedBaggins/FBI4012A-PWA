import { TestBed } from '@angular/core/testing';

import { SprintConfigurationService } from './sprint-configuration.service';

describe('SprintConfigurationService', () => {
  let service: SprintConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
