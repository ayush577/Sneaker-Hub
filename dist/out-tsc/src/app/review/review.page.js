import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
let ReviewPage = class ReviewPage {
    constructor(modalCtrl, navparms) {
        this.modalCtrl = modalCtrl;
        this.navparms = navparms;
        this.slideOpts = {
            initialSlide: 1,
            speed: 2000,
        };
        this.slideData = this.navparms.get('data');
        this.image = this.slideData[0].imageurl;
        console.log("SlideData", this.slideData);
    }
    ngOnInit() {
    }
    getActiveIndex(slides, i) {
        this.image = this.slideData[i].imageurl;
    }
    closeModal() {
        this.modalCtrl.dismiss();
    }
};
ReviewPage = tslib_1.__decorate([
    Component({
        selector: 'app-review',
        templateUrl: './review.page.html',
        styleUrls: ['./review.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController, NavParams])
], ReviewPage);
export { ReviewPage };
//# sourceMappingURL=review.page.js.map