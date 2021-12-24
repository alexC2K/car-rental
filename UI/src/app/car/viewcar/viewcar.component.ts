import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-viewcar',
  templateUrl: './viewcar.component.html',
  styleUrls: ['./viewcar.component.css']
})
export class ViewcarComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() newCar:any;
  CarID!:string;
  CarName!:string;
  CarKM!:string;
  CarYear!:string;
  CarImage!:string;
  CarPhotoPath!:string;
  CarOwner!:string;

  ngOnInit(): void {
    this.instantiateData();
  }

  instantiateData() {
    this.CarID = this.newCar.CarID;
    this.CarName = this.newCar.CarName;
    this.CarKM = this.newCar.CarKM;
    this.CarYear = this.newCar.CarYear;
    this.CarImage = this.newCar.CarImage;
    this.CarPhotoPath = this.service.CarPhotoURL + this.newCar.CarImage;    
  }
}
