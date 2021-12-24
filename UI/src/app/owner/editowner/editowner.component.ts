import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-editowner',
  templateUrl: './editowner.component.html',
  styleUrls: ['./editowner.component.css']
})
export class EditownerComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() newOwner:any;
  OwnerID!:string;
  OwnerName!:string;
  OwnerPhotoName!:string;
  OwnerPhotoPath!:string;
  Car!:string;
  DateJoined!:string;
  OwnerPhoneNumber!:string;
  CarOwnedID!:string;

  CarList:any=[];

  ngOnInit(): void {
    this.loadCarList();
  }

  loadCarList() {
    this.service.getAllCarNames().subscribe((data : any) => {
      this.CarList = data;

      this.OwnerID = this.newOwner.OwnerID;
      this.OwnerName = this.newOwner.OwnerName;
      this.OwnerPhotoName = this.newOwner.OwnerPhotoName;
      this.OwnerPhotoPath = this.service.PhotoURL + this.newOwner.OwnerPhotoName;
      this.Car = this.newOwner.Car;
      this.DateJoined = this.newOwner.DateJoined;
      this.OwnerPhoneNumber = this.newOwner.OwnerPhoneNumber;
      this.CarOwnedID = this.newOwner.CarOwnedID;

    });
  }

  addOwner() {
    var val = 
    {
      OwnerID:this.OwnerID,
      OwnerName:this.OwnerName,
      OwnerPhotoName:this.OwnerPhotoName,
      Car:this.Car,
      DateJoined:this.DateJoined,
      OwnerPhoneNumber:this.OwnerPhoneNumber,
      CarOwnedID:this.CarOwnedID
    };
    this.service.addOwner(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateOwner() {
    var val = 
    {
      OwnerID:this.OwnerID,
      OwnerName:this.OwnerName,
      OwnerPhotoName:this.OwnerPhotoName,
      Car:this.Car,
      DateJoined:this.DateJoined,
      OwnerPhoneNumber:this.OwnerPhoneNumber,
      CarOwnedID:this.CarOwnedID
    };
    this.service.updateOwner(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event:any) {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data : any) => {
        this.OwnerPhotoName = data.toString();
        this.OwnerPhotoPath = this.service.PhotoURL + this.OwnerPhotoName;
    });
  }
}
