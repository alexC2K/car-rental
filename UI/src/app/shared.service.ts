import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:5001/api";
  readonly PhotoURL = "https://localhost:5001/Photos/";
  readonly CarPhotoURL = "https://localhost:5001/CarPhotos/";

  constructor(private http:HttpClient) { }

  getCarList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/car');
  }

  addCar(val:any) {
    return this.http.post<any>(this.APIUrl + '/car', val);
  }

  updateCar(val:any) {
    return this.http.put<any>(this.APIUrl + '/car', val);
  }

  updateRentStatus(val:any) {
    return this.http.put<any>(this.APIUrl + "/car/UpdateRentStatus", val);
  }

  deleteCar(val:any) {
    return this.http.delete<any>(this.APIUrl + '/car/' + val);
  }

  getOwnerList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/owner');
  }

  getCarOwner(val:any) {
    return this.http.get<any>(this.APIUrl + '/car/GetCarOwner/' + val);
  }

  addOwner(val:any) {
    return this.http.post<any>(this.APIUrl + '/owner', val);
  }

  updateOwner(val:any) {
    return this.http.put<any>(this.APIUrl + '/owner', val);
  }

  deleteOwner(val:any) {
    return this.http.delete<any>(this.APIUrl + '/owner/' + val);
  }

  uploadPhoto(val:any) {
    return this.http.post(this.APIUrl + '/owner/SaveFile', val);
  }

  uploadCarPhoto(val:any) {
    return this.http.post(this.APIUrl + '/car/SaveCarFile', val);
  }

  getAllCarNames():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/owner/GetAllCarNames');
  }

  getRentedCars():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + "/owner/GetRentedCars");
  }
}
