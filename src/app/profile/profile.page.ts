import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  defaultImage = '../../assets/icon/man.svg';
  user: any;
  data: any = {};
  myData;
  base;
  call;
  userid;
  constructor(public authservice: UserService, public router :Router ) {

    //this.getProfileInfo();
    this.user = {
      login: false,
      picture: "",
      name: "",
      email: " ",
      mobileNumber: " ",
      address: ""

    }
  }


  ngOnInit() {

  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }

  getProfileInfo() {
    console.log("Get ProfileInfo Called");
    let localStorageData = localStorage.getItem('obj');
    let alldata = JSON.parse(localStorageData);
    console.log("User ID .........", alldata.userid);
    this.base = this.authservice.getProfileInfo(alldata.userid);
    this.call = this.base.subscribe(
      data => {
        console.log(data);
        this.user.name = data.userprofile.name;
        this.user.email = data.userprofile.email;
        this.user.mobileNumber = data.userprofile.number;
        this.user.address = data.userprofile.newuseraddress;
        if (data.userprofile.user_picture !== "null") {
         
          this.user.picture = data.userprofile.user_picture;  
        }
        else{
          this.user.picture = this.defaultImage;
        }
       
      }


    )


  }
  ionViewWillEnter() {
    this.getProfileInfo();
  }

}
