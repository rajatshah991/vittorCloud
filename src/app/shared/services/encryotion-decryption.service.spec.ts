import { TestBed } from '@angular/core/testing';

import { EncryotionDecryptionService } from './encryotion-decryption.service';

describe('EncryotionDecryptionService', () => {
  let service: EncryotionDecryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryotionDecryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
