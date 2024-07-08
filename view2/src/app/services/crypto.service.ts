import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  generateCodeChallenge(codeVerifier: string): string {
    // Encode the code verifier using SHA-256
    return this.base64URL(CryptoJS.SHA256(codeVerifier));
  }

  base64URL(string: any) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
