import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../api/user.service';
import { Router, ActivatedRoute } from "@angular/router";
let ContactPage = class ContactPage {
    constructor(router, route, formBuilder, authservice) {
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.authservice = authservice;
        this.submitted = false;
        this.data = {};
        this.contactusform = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobilenumber: ['', [Validators.required]],
            message: ['', [Validators.required]],
        });
    }
    ngOnInit() {
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
    contactUs() {
        if (this.contactusform.valid) {
            this.myData = JSON.stringify(this.data);
            this.base = this.authservice.contactUs(this.myData);
            this.call = this.base.subscribe(data => {
                console.log(data);
                if (data.status == 200) {
                    this.authservice.presentToast(data.success);
                    this.router.navigate(['/home']);
                }
                else {
                    this.authservice.presentToast("Something is Wrong");
                }
            }, err => {
                console.log(err);
            });
        }
    }
};
ContactPage = tslib_1.__decorate([
    Component({
        selector: 'app-contact',
        templateUrl: './contact.page.html',
        styleUrls: ['./contact.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, FormBuilder, UserService])
], ContactPage);
export { ContactPage };
//# sourceMappingURL=contact.page.js.map