import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, } from "@angular/router";
import { UserService } from '../api/user.service';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
let ForgetPage = class ForgetPage {
    constructor(formBuilder, httpClient, router, authservice, menuCtrl) {
        this.formBuilder = formBuilder;
        this.httpClient = httpClient;
        this.router = router;
        this.authservice = authservice;
        this.menuCtrl = menuCtrl;
        this.data = {};
        this.isSent = false;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'email', message: 'Email must contain valid email pattern.' }
            ]
        };
        this.forgetPass = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
    ngOnInit() {
    }
    back() {
        console.log("back Method is Called");
        this.forgetPass.reset();
        this.router.navigateByUrl('/login');
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }
    forgetuserpassword() {
        if (this.forgetPass.valid) {
            this.base = this.authservice.forgetpassword(this.data.email).subscribe((data) => {
                console.log(data);
                if (data.status === 200) {
                    this.isSent = true;
                    setTimeout(() => {
                        this.router.navigateByUrl('/login');
                    }, 3000);
                }
                else {
                    this.authservice.presentToast(data.error);
                }
            });
        }
    }
};
ForgetPage = tslib_1.__decorate([
    Component({
        selector: 'app-forget',
        templateUrl: './forget.page.html',
        styleUrls: ['./forget.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, UserService, MenuController])
], ForgetPage);
export { ForgetPage };
//# sourceMappingURL=forget.page.js.map