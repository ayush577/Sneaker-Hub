import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  base;
  call;
  CategoryData: any = [];

  constructor(public authservice: UserService, public router: Router) { }

  ngOnInit() {
    this.getcategoryname();
  }

  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }
  getcategoryname() {
    this.authservice.presentLoading();
    this.base = this.authservice.getcategoryname();
    this.call = this.base.subscribe(data => {

      console.log("All Categories Data", data);
      if (data !== null) {
        for (let i = 0; i < data.allcategories.length; i++) {

          this.CategoryData.push(data.allcategories[i]);
          // this.Category =  data[i].map(a => a.tbl_category_id);


        }
        this.authservice.loadingDismiss();
        console.log("Categories name object", this.CategoryData);

      }
    }),
    err=>{
      this.authservice.loadingDismiss();
      console.log(err);
      
    }
    

  }
  gotocategory(id){
    this.router.navigate(['/home'],{
      queryParams: id,
      });
    
  }

}
