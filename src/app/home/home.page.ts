import { Component } from "@angular/core";
import { MenuController, Platform } from "@ionic/angular";
import { UserService } from "../api/user.service";
import { Router } from "@angular/router";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  Category: any = [];
  CategoryData: any = [];
  base;
  subscription: any;
  call;
  allCategories: any = [];
  activesegement;

  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public statusBar :StatusBar,
    public authservice: UserService
  ) {
    
    this.statusBar.backgroundColorByHexString('#09163d');
  }

  getAllCategories(): any {
    this.Category=[];
    return (this.base = this.authservice
      .getcategoryname()
      .subscribe((data: any = []) => {
        console.log("All Categories Data", data.allcategories);
        if (data !== null) {
          for (let i = 0; i < data.allcategories.length; i++) {
            this.Category.push(data.allcategories[i]);
          }
        }
        this.activatedRoute.queryParams.subscribe(res => {
          console.log("hello res is here", res);
          if (res[0]) {
            this.activesegement = res[0];
            console.log("i am checking if loop ", this.activesegement);
          } else {
            this.activesegement = this.Category[0].tbl_category_id;
            console.log("i am checking else loop ", this.activesegement);
          }
        });
      }));
  }

  getCategoriesData(id) {
    this.menuCtrl.close();
    this.authservice.presentLoading();
    console.log("Your Selected MEN Category");
    let tbl_category_id = id;
    this.CategoryData.length = 0;
    this.base = this.authservice
      .getCategoryData(tbl_category_id)
      .subscribe((data: any = []) => {
        if (data !== null) {
          console.log("Men Data from server", data);
          for (let i = 0; i < data.catalogproducts.length; i++) {
            this.CategoryData.push(data.catalogproducts[i]);
            console.log("Data", this.CategoryData[i].category_id);
          }
          this.authservice.loadingDismiss();
        } else {
          this.authservice.loadingDismiss();
        }
        console.log("Data of CategoryData", this.CategoryData);
      }),
      err => {
        this.authservice.loadingDismiss();
        this.authservice.presentToast(
          "Something went wrong Please try Again..."
        );
        console.log(err);
      }
  }
  gotoDetails(id) {
    this.router.navigate(["/details", id]);
  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }

  segmentChanged(ev: any) {
    console.log("segment id is ", ev);

    this.activesegement = ev;
    this.getCategoriesData(this.activesegement);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getAllCategories();
    this.menuCtrl.close();
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
