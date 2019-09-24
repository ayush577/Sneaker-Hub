import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UpcomingPage } from './upcoming.page';
const routes = [
    {
        path: '',
        component: UpcomingPage
    }
];
let UpcomingPageModule = class UpcomingPageModule {
};
UpcomingPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [UpcomingPage]
    })
], UpcomingPageModule);
export { UpcomingPageModule };
//# sourceMappingURL=upcoming.module.js.map