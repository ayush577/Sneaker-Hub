import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
let SocialPage = class SocialPage {
    constructor(loadingController, router) {
        this.loadingController = loadingController;
        this.router = router;
        this.CategoryData = [
            { S_name: "Air Jordan V (5) Retro", s_id: 1, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 2, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 3, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 4, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 5, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 6, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 7, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 8, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 9, s_price: 189.99 },
            { S_name: "Air Jordan V (5) Retro", s_id: 10, s_price: 189.99 },
        ];
    }
    ngOnInit() {
    }
    segmentChanged(event) {
        this.presentLoading();
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
    presentLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                spinner: 'circles',
                duration: 3000
            });
            yield loading.present();
            const { role, data } = yield loading.onDidDismiss();
            console.log('Loading dismissed!');
        });
    }
    ionViewWillEnter() {
        this.category1 = 'instagram';
    }
};
SocialPage = tslib_1.__decorate([
    Component({
        selector: 'app-social',
        templateUrl: './social.page.html',
        styleUrls: ['./social.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [LoadingController, Router])
], SocialPage);
export { SocialPage };
//# sourceMappingURL=social.page.js.map