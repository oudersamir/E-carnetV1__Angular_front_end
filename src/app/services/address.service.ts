import { Address } from './../models/address';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get(`${environment.apiUrl}/addresses`);
  }

  addAddress(address:Address){
    return this.httpClient.post(`${environment.apiUrl}/addresses`,address);

  }

  deleteAddress(address:Address){
    return this.httpClient.delete(`${environment.apiUrl}/addresses`+'/'+address.addressId);
  }

  updateAddress(address:Address){
    return this.httpClient.put(`${environment.apiUrl}/addresses`+'/'+address.addressId,address);
 
  }
}
