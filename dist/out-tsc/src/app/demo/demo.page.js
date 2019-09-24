import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
let DemoPage = class DemoPage {
    constructor(platform, menuCtrl, callNumber, alertController, authService) {
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.callNumber = callNumber;
        this.alertController = alertController;
        this.authService = authService;
        this.CategoryData = [];
        this.slideData = [];
        this.Releases = [];
        this.slideOpts = {
            initialSlide: 0,
            speed: 2000
        };
    }
    ngOnInit() {
        this.getDemoData();
        this.getmobilenumber();
    }
    callPopUp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Call To The Store',
                mode: 'md',
                message: 'Tab on call button to make a call',
                cssClass: 'primary',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: blah => {
                            console.log('Confirm Cancel: blah');
                        }
                    },
                    {
                        text: 'call',
                        cssClass: 'secondary',
                        handler: () => {
                            this.makecall();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    getmobilenumber() {
        this.authService.getnumber().subscribe((data = []) => {
            this.mobileno = data.adminnumber.store_number;
            console.log('admin number is', this.mobileno);
        });
    }
    getDemoData() {
        this.authService.demopageslider().subscribe((data = []) => {
            this.slideData = data.responsehomeimages;
            this.Releases = data.responsenewreleaseimage;
        });
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }
    slidesDidLoad(slides) {
        slides.startAutoplay();
    }
    makecall() {
        this.callNumber
            .callNumber(this.mobileno, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('try calling on ', this.mobileno, ' but ', err));
    }
    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });
    }
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }
};
DemoPage = tslib_1.__decorate([
    Component({
        selector: 'app-demo',
        templateUrl: './demo.page.html',
        styleUrls: ['./demo.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Platform,
        MenuController,
        CallNumber,
        AlertController,
        UserService])
], DemoPage);
export { DemoPage };
//# sourceMappingURL=demo.page.js.map