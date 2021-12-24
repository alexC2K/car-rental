import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service:SharedService) { }

  CarList:any=[];

  ngOnInit(): void {
    this.loadCarList();
  }

  loadCarList() {
    this.service.getRentedCars().subscribe((data : any) => {
      this.CarList = data;
    });
  }

  unrentCar(item:any) {
    if(confirm('Are you sure you want to unrent this car?')) {
      this.service.updateRentStatus(item).subscribe(data => {
        alert(data.toString());
        this.loadCarList();
      });
    }    
  }
}
