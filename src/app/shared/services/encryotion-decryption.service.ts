import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { AuthToken } from '../bearer-token';

@Injectable({
  providedIn: 'root'
})
export class EncryotionDecryptionService {

  constructor() { }

  /** Encrypted data before storing to localstaorage */
  encryptData(data:string):string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), `${environment.SECRET_KEY}`).toString();
    } catch (err) {
      return err;
    }
  }

  /**Decrypt data after geting value fromm localstaorage */
  decryptData(data:string|null):AuthToken|string {
    if (data) {
    try {
      const decrytedData = CryptoJS.AES.decrypt(data, `${environment.SECRET_KEY}`);
      if (decrytedData.toString()) {
        return JSON.parse(decrytedData.toString(CryptoJS.enc.Utf8));
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  } else {
    return '';
  }
}
}
