import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
let UpcomingPage = class UpcomingPage {
    constructor(authservice, router) {
        this.authservice = authservice;
        this.router = router;
        this.Banners = [];
        this.isBanner = false;
    }
    upcomingProduct() {
        this.authservice.presentLoading();
        this.base = this.authservice.upcomingProduct().subscribe((data = []) => {
            console.log(data);
            for (let i = 0; i < data.responseupcomingproduct.length; i++) {
                this.Banners.push(data.responseupcomingproduct[i]);
                console.log("Data", this.Banners[i].tbl_product_id);
            }
            this.authservice.loadingDismiss();
            console.log(this.Banners);
        });
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
    ngOnInit() {
        this.upcomingProduct();
    }
};
UpcomingPage = tslib_1.__decorate([
    Component({
        selector: 'app-upcoming',
        templateUrl: './upcoming.page.html',
        styleUrls: ['./upcoming.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, Router])
], UpcomingPage);
export { UpcomingPage };
//# sourceMappingURL=upcoming.page.js.map