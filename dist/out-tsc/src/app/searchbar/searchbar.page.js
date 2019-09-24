import * as tslib_1 from "tslib";
import { Router } from '@angular/router';
import { UserService } from "./../api/user.service";
import { Component } from "@angular/core";
let SearchbarPage = class SearchbarPage {
    constructor(authservice, router) {
        this.authservice = authservice;
        this.router = router;
        this.CategoryData = [];
        this.dataState = 0;
    }
    ngOnInit() { }
    searchData(value) {
        if (value) {
            this.authservice.presentLoading();
            this.authservice.getSearchResult(value).subscribe((data = []) => {
                if (data.status === 400) {
                    this.dataState = 1;
                    this.authservice.loadingDismiss();
                    this.authservice.presentToast("No result found, try another keyword!");
                }
                else {
                    this.dataState = 2;
                    this.CategoryData = data.catalogproducts;
                    this.authservice.loadingDismiss();
                }
            }), err => {
                this.authservice.loadingDismiss();
                this.authservice.presentToast(err);
            };
        }
        else {
            this.authservice.presentToast("oops! you forget to enter your search keyword");
        }
    }
    gotoDetails(id) {
        this.router.navigate(["/details", id]);
    }
};
SearchbarPage = tslib_1.__decorate([
    Component({
        selector: "app-searchbar",
        templateUrl: "./searchbar.page.html",
        styleUrls: ["./searchbar.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, Router])
], SearchbarPage);
export { SearchbarPage };
//# sourceMappingURL=searchbar.page.js.map