import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-viewowner',
  templateUrl: './viewowner.component.html',
  styleUrls: ['./viewowner.component.css']
})
export class ViewownerComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() newOwner:any;
  OwnerID!:string;
  OwnerName!:string;
  OwnerPhotoName!:string;
  OwnerPhotoPath!:string;
  Car!:string;
  DateJoined!:string;
  OwnerPhoneNumber!:string;

  ngOnInit(): void {
    this.OwnerID = this.newOwner.OwnerID;
    this.OwnerName = this.newOwner.OwnerName;
    this.OwnerPhotoName = this.newOwner.OwnerPhotoName;
    this.OwnerPhotoPath = this.service.PhotoURL + this.newOwner.OwnerPhotoName;
    this.Car = this.newOwner.Car;
    this.DateJoined = this.newOwner.DateJoined;
    this.OwnerPhoneNumber = this.newOwner.OwnerPhoneNumber;
  }

}
