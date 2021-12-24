import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-showcar',
  templateUrl: './showcar.component.html',
  styleUrls: ['./showcar.component.css']
})
export class ShowcarComponent implements OnInit {

  constructor(private service:SharedService) { }

  CarList:any = [];

  ModalTitle!:string;
  ActivateEditCarComp:boolean = false;
  ViewMode:boolean = false;
  newCar:any;

  ngOnInit(): void {
    this.refreshCarList();
  }

  closeClick() {
    this.ActivateEditCarComp = false;
    this.ViewMode = false;
    this.refreshCarList();
  }

  addClick() {
    this.newCar = {
      CarID: 0,
      CarName: "",
      CarKM: 0,
      CarYear: 0,
      CarImage: "default.jpg",
      CarRented: 0
    }

    this.ModalTitle = "Add a new car";
    this.ActivateEditCarComp = true;
  }

  rentClick(item:any) {
    this.newCar = item;
    if(confirm('Are you sure you want to rent this car?')) {
      this.newCar.CarRented = 1;
      this.service.updateCar(this.newCar).subscribe(res => {
        alert(res.toString());
        this.refreshCarList();
      });
    }
  }

  viewClick(item:any) {
    this.newCar = item;
    this.ViewMode = true;
    this.ModalTitle = "View the details";
  }

  editClick(item:any) {
    this.newCar = item;
    this.ModalTitle = "Edit the car";
    this.ActivateEditCarComp = true;
  }
  
  deleteClick(item:any) {
    if(confirm('Are you sure you want to delete this car?')) {
      this.service.deleteCar(item.CarID).subscribe(data => {
        alert(data.toString());
        this.refreshCarList();
      });
    }
  }
  
  refreshCarList() {
    this.service.getCarList().subscribe(data => {
      this.CarList = data;
    });
  }
}
