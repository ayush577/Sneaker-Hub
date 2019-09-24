import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
let CategoryPage = class CategoryPage {
    constructor(authservice, router) {
        this.authservice = authservice;
        this.router = router;
        this.CategoryData = [];
    }
    ngOnInit() {
        this.getcategoryname();
    }
    search() {
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
            err => {
                this.authservice.loadingDismiss();
                console.log(err);
            };
    }
    gotocategory(id) {
        this.router.navigate(['/home'], {
            queryParams: id,
        });
    }
};
CategoryPage = tslib_1.__decorate([
    Component({
        selector: 'app-category',
        templateUrl: './category.page.html',
        styleUrls: ['./category.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, Router])
], CategoryPage);
export { CategoryPage };
//# sourceMappingURL=category.page.js.map