import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LaunchService } from './launch.service';

describe('LaunchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: LaunchService = TestBed.get(LaunchService);
    expect(service).toBeTruthy();
  });
});
