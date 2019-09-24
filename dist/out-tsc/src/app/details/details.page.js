import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Location } from "@angular/common";
import { ReviewPage } from "../review/review.page";
import { UserService } from "../api/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { VirtualPage } from '../virtual/virtual.page';
//import { setTimeout } from 'timers';
let DetailsPage = class DetailsPage {
    constructor(router, modalCtrl, location, authService, route, alertController, callNumber) {
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.location = location;
        this.authService = authService;
        this.route = route;
        this.alertController = alertController;
        this.callNumber = callNumber;
        this.slideOpts = {
            initialSlide: 1,
            autoplay: true,
            loop: true,
            speed: 2000
        };
        this.slideData = [];
        this.colors = [];
        this.Size = [];
        this.productId = this.route.snapshot.params.id;
        console.log(this.productId);
        this.getProductDetails(this.productId);
        this.getmobilenumber();
    }
    ngOnInit() { }
    back() {
        this.location.back();
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
    callPopUp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: "Call To The Store",
                mode: "md",
                message: "Tab on call button to make a call",
                cssClass: "primary",
                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: blah => {
                            console.log("Confirm Cancel: blah");
                        }
                    },
                    {
                        text: "call",
                        cssClass: "secondary",
                        handler: () => {
                            this.makecall();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    reviewProduct() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("reviewProduct", this.slideData);
            const modal = yield this.modalCtrl.create({
                component: ReviewPage,
                componentProps: {
                    data: this.slideData
                }
            });
            return yield modal.present();
        });
    }
    virtual() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: VirtualPage,
                componentProps: {
                    data: this.slideData
                }
            });
            return yield modal.present();
        });
    }
    getProductDetails(id) {
        this.authService.presentLoading();
        let id1 = id;
        console.log("GetProductDetails Called");
        this.base = this.authService
            .getProductDetial(id1)
            .subscribe((data) => {
            console.log(data);
            this.productprice = data.productdetails.tbl_product_price;
            this.productname = data.productdetails.tbl_product_name;
            this.Size = data.productdetails.tbl_product_sizes;
            this.colors = data.productdetails.tbl_product_colors;
            this.slideData = data.productdetails.tbl_product_images;
            this.postImage = data.productdetails.tbl_product_picture;
            this.sku = data.productdetails.tbl_product_sku;
            this.relesedate = data.productdetails.release_date;
            this.description = data.productdetails.tbl_product_desc;
            this.history = data.productdetails.tbl_product_history;
            this.authService.loadingDismiss();
        }), err => {
            this.authService.loadingDismiss();
            this.authService.presentToast(err);
        };
    }
    getmobilenumber() {
        this.authService.getnumber().subscribe((data = []) => {
            this.mobileno = data.adminnumber.store_number;
            console.log("admin number is", this.mobileno);
        });
    }
    makecall() {
        this.callNumber
            .callNumber(this.mobileno, true)
            .then(res => console.log("Launched dialer!", res))
            .catch(err => console.log("try calling on ", this.mobileno, " but ", err));
    }
};
DetailsPage = tslib_1.__decorate([
    Component({
        selector: "app-details",
        templateUrl: "./details.page.html",
        styleUrls: ["./details.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ModalController,
        Location,
        UserService,
        ActivatedRoute,
        AlertController,
        CallNumber])
], DetailsPage);
export { DetailsPage };
//# sourceMappingURL=details.page.js.map