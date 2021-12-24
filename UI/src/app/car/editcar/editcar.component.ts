import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrls: ['./editcar.component.css']
})
export class EditcarComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() newCar:any;
  CarID!:string;
  CarName!:string;
  CarKM!:string;
  CarYear!:string;
  CarImage!:string;
  CarPhotoPath!:string;
  CarRented!:string;

  CarList:any=[];

  ngOnInit(): void {
    this.CarID = this.newCar.CarID;
    this.CarName = this.newCar.CarName;
    this.CarKM = this.newCar.CarKM;
    this.CarYear = this.newCar.CarYear;
    this.CarImage = this.newCar.CarImage;
    this.CarPhotoPath = this.service.CarPhotoURL + this.newCar.CarImage;
    this.CarRented = this.newCar.CarRented;
  }
  
  addCar() {
    var val = 
    {
      CarID:this.CarID,
      CarName:this.CarName,
      CarKM:this.CarKM,
      CarYear:this.CarYear,
      CarImage:this.CarImage,
      CarRented:this.CarRented
    };
    this.service.addCar(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateCar() {
    var val = 
    {
      CarID:this.CarID,
      CarName:this.CarName,
      CarKM:this.CarKM,
      CarYear:this.CarYear,
      CarImage:this.CarImage,
      CarRented:this.CarRented
    };
    this.service.updateCar(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadCarPhoto(event:any) {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadCarPhoto(formData).subscribe((data : any) => {
        this.CarImage = data.toString();
        this.CarPhotoPath = this.service.CarPhotoURL + this.CarImage;
    });
  }
}
