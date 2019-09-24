import { Router } from '@angular/router';
import { UserService } from "./../api/user.service";
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.page.html",
  styleUrls: ["./searchbar.page.scss"]
})
export class SearchbarPage implements OnInit {
  CategoryData: any = [];
  dataState=0;
  data='';
  constructor(public authservice: UserService,public router:Router) {}

  ngOnInit() {}
  searchData(value) {
    if(value){
      this.authservice.presentLoading();
      this.authservice.getSearchResult(value).subscribe((data: any = []) => {
        if(data.status === 400){
          this.dataState=1;
          this.authservice.loadingDismiss();
          this.authservice.presentToast("No result found, try another keyword!");
        }else{
          this.dataState=2;
          this.CategoryData = data.catalogproducts;        
          this.authservice.loadingDismiss();
        }      
      }),err=>{
        this.authservice.loadingDismiss();
        this.authservice.presentToast(err);
      }
    }
    else{
      this.authservice.presentToast("oops! you forget to enter your search keyword");
    }   
  }
  gotoDetails(id) {
    this.router.navigate(["/details", id]);
  }
}
