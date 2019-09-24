import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthenticityPage } from './authenticity.page';
const routes = [
    {
        path: '',
        component: AuthenticityPage
    }
];
let AuthenticityPageModule = class AuthenticityPageModule {
};
AuthenticityPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [AuthenticityPage]
    })
], AuthenticityPageModule);
export { AuthenticityPageModule };
//# sourceMappingURL=authenticity.module.js.map