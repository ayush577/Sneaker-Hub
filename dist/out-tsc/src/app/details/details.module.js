import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './details.page';
const routes = [
    {
        path: '',
        component: DetailsPage
    }
];
let DetailsPageModule = class DetailsPageModule {
};
DetailsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [DetailsPage]
    })
], DetailsPageModule);
export { DetailsPageModule };
//# sourceMappingURL=details.module.js.map