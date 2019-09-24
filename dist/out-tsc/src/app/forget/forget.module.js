import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgetPage } from './forget.page';
const routes = [
    {
        path: '',
        component: ForgetPage
    }
];
let ForgetPageModule = class ForgetPageModule {
};
ForgetPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ForgetPage]
    })
], ForgetPageModule);
export { ForgetPageModule };
//# sourceMappingURL=forget.module.js.map