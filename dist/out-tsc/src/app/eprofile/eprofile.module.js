import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EprofilePage } from './eprofile.page';
const routes = [
    {
        path: '',
        component: EprofilePage
    }
];
let EprofilePageModule = class EprofilePageModule {
};
EprofilePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [EprofilePage]
    })
], EprofilePageModule);
export { EprofilePageModule };
//# sourceMappingURL=eprofile.module.js.map