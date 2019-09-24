import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { UserService } from '../api/user.service';
let NoInternetPage = class NoInternetPage {
    constructor(platform, modalCtrl, network, authService) {
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.network = network;
        this.authService = authService;
    }
    ngOnInit() {
    }
    checkConnection() {
        if (this.network.type != 'unknown' && this.network.type != 'none') {
            this.modalCtrl.dismiss();
        }
        else {
            this.authService.presentToast(' Not connected yet :(');
        }
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
NoInternetPage = tslib_1.__decorate([
    Component({
        selector: 'app-no-internet',
        templateUrl: './no-internet.page.html',
        styleUrls: ['./no-internet.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Platform, ModalController, Network, UserService])
], NoInternetPage);
export { NoInternetPage };
//# sourceMappingURL=no-internet.page.js.map