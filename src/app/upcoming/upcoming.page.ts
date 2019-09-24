import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  Banners: any=[];
  isBanner: boolean = false;
  base;

  upcomingProduct() {
    this.authservice.presentLoading();
    this.base = this.authservice.upcomingProduct().subscribe(
      (data: any = []) => {
        console.log(data);
        for (let i = 0; i < data.responseupcomingproduct.length; i++) {

          this.Banners.push(data.responseupcomingproduct[i]);
          console.log("Data", this.Banners[i].tbl_product_id);

        }
        
        this.authservice.loadingDismiss();
    
        
        console.log(this.Banners);

      }
    )


  }
  constructor(public authservice: UserService,public router :Router) {
    
    

  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }
  ngOnInit() {
    this.upcomingProduct();

  }
 

}
