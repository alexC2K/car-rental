import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-showowner',
  templateUrl: './showowner.component.html',
  styleUrls: ['./showowner.component.css']
})
export class ShowownerComponent implements OnInit {

  constructor(private service:SharedService) { }

  OwnerList:any = [];

  ModalTitle!:string;
  ActivateEditOwnerComp:boolean = false;
  ViewMode:boolean = false;
  newOwner:any;

  ngOnInit(): void {
    this.refreshOwnerList();
  }

  closeClick() {
    this.ActivateEditOwnerComp = false;
    this.ViewMode = false;
    this.refreshOwnerList();
  }

  addClick() {
    this.newOwner = {
      OwnerID: 0,
      OwnerName: "",
      OwnerPhotoName: "default.jpg",
      Car: "",
      DateJoined: "",
      OwnerPhoneNumber: "undefined",
      CarOwnedID: -1
    }

    this.ModalTitle = "Add a new owner";
    this.ActivateEditOwnerComp = true;
  }

  viewClick(item:any) {
    this.newOwner = item;
    this.ViewMode = true;
    this.ModalTitle = "View the details";
  }

  editClick(item:any) {
    this.newOwner = item;
    this.ModalTitle = "Edit the owner";
    this.ActivateEditOwnerComp = true;
  }

  deleteClick(item:any) {
    if(confirm('Are you sure you want to delete this owner?')) {
      this.service.deleteOwner(item.OwnerID).subscribe(data => {
        alert(data.toString());
        this.refreshOwnerList();
      });
    }
  }
  
  refreshOwnerList() {
    this.service.getOwnerList().subscribe(data => {
      this.OwnerList = data;
    });
  }
}
