import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let AboutPage = class AboutPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    search() {
        console.log("icon method called");
        this.router.navigate(['/searchbar']);
    }
};
AboutPage = tslib_1.__decorate([
    Component({
        selector: 'app-about',
        templateUrl: './about.page.html',
        styleUrls: ['./about.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.page.js.map