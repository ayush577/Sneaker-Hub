import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MenuController, Platform } from "@ionic/angular";
import { UserService } from "../api/user.service";
import { Router } from "@angular/router";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ActivatedRoute } from "@angular/router";
let HomePage = class HomePage {
    constructor(platform, menuCtrl, activatedRoute, router, statusBar, authservice) {
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.statusBar = statusBar;
        this.authservice = authservice;
        this.Category = [];
        this.CategoryData = [];
        this.allCategories = [];
        this.getAllCategories();
        this.menuCtrl.close();
        this.statusBar.backgroundColorByHexString('#09163d');
    }
    getAllCategories() {
        return (this.base = this.authservice
            .getcategoryname()
            .subscribe((data = []) => {
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
                }
                else {
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
            .subscribe((data = []) => {
            if (data !== null) {
                console.log("Men Data from server", data);
                for (let i = 0; i < data.catalogproducts.length; i++) {
                    this.CategoryData.push(data.catalogproducts[i]);
                    console.log("Data", this.CategoryData[i].category_id);
                }
                this.authservice.loadingDismiss();
            }
            else {
                this.authservice.loadingDismiss();
            }
            console.log("Data of CategoryData", this.CategoryData);
        }),
            err => {
                this.authservice.loadingDismiss();
                this.authservice.presentToast("Something went wrong Please try Again...");
                console.log(err);
            };
    }
    gotoDetails(id) {
        this.router.navigate(["/details", id]);
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
    segmentChanged(ev) {
        console.log("segment id is ", ev);
        this.activesegement = ev;
        this.getCategoriesData(this.activesegement);
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }
    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            navigator["app"].exitApp();
        });
    }
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: "app-home",
        templateUrl: "home.page.html",
        styleUrls: ["home.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [Platform,
        MenuController,
        ActivatedRoute,
        Router,
        StatusBar,
        UserService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map