import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NoInternetPage } from './no-internet.page';
const routes = [
    {
        path: '',
        component: NoInternetPage
    }
];
let NoInternetPageModule = class NoInternetPageModule {
};
NoInternetPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [NoInternetPage]
    })
], NoInternetPageModule);
export { NoInternetPageModule };
//# sourceMappingURL=no-internet.module.js.map