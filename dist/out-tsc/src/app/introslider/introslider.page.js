import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { MenuController } from '@ionic/angular';
let IntrosliderPage = class IntrosliderPage {
    constructor(router, authservice, menuCtrl) {
        this.router = router;
        this.authservice = authservice;
        this.menuCtrl = menuCtrl;
        this.skipMsg = "SKIP";
        this.time = setInterval(() => {
            this.showTime();
        }, 1000);
    }
    ngOnInit() {
        this.menuCtrl.enable(false, "1");
        console.log('menu', this.menuCtrl.enable);
        if (localStorage.getItem('introForUser')) {
            this.router.navigate(['/home']);
        }
        localStorage.setItem('introForUser', 'true');
    }
    skip() {
        this.router.navigate(['/authenticity']);
    }
    slideChange() {
        // if( this.slides.isEnd()){
        //   this.skipMsg = "Alright, I Got it"
        // }
    }
    next() {
        this.slides.slideNext(700, true);
    }
    theEnd() {
        this.authservice.presentLoading().then(() => {
            this.authservice.loadingDismiss();
            this.router.navigate(['/authenticity']);
        });
    }
    showTime() {
        let h;
        let m;
        let s;
        let mm;
        let dd;
        let yy;
        var time = new Date();
        h = time.getHours(); // 0 - 23
        m = time.getMinutes(); // 0 - 59
        s = time.getSeconds(); // 0 - 59
        var date = new Date();
        mm = date.toLocaleString('default', { month: 'long' });
        dd = date.getUTCDate();
        yy = date.getUTCFullYear();
        var session = "AM";
        if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
            session = "PM";
        }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        this.time = h + ":" + m + ":" + s + " " + session;
        this.date1 = mm + " " + dd + ", " + yy;
    }
};
tslib_1.__decorate([
    ViewChild(IonSlides, null),
    tslib_1.__metadata("design:type", IonSlides)
], IntrosliderPage.prototype, "slides", void 0);
IntrosliderPage = tslib_1.__decorate([
    Component({
        selector: 'app-introslider',
        templateUrl: './introslider.page.html',
        styleUrls: ['./introslider.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router, UserService, MenuController])
], IntrosliderPage);
export { IntrosliderPage };
//# sourceMappingURL=introslider.page.js.map