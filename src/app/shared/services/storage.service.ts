import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../bearer-token';
import { EncryotionDecryptionService } from './encryotion-decryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  downloadContract = false;
  constructor(private routes: Router, public encrDecrService: EncryotionDecryptionService) {
  }

  /**Setting item in local storage */
  setItem(key: string, value: any): void {
    const encryptedData = this.encrDecrService.encryptData(value);
      localStorage.setItem(key, encryptedData);
  }

  /**Getting item in localstorage */
  getItem(key: string): AuthToken|string {
    const data =  localStorage.getItem(key);
    const decryptedData = this.encrDecrService.decryptData(data);
    return decryptedData;
  }

  /**Remove item from localstorage */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**Clear a token */
  clear() {
    localStorage.removeItem('token');
  }
}
