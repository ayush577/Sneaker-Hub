import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SocialPage } from './social.page';
const routes = [
    {
        path: '',
        component: SocialPage
    }
];
let SocialPageModule = class SocialPageModule {
};
SocialPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [SocialPage]
    })
], SocialPageModule);
export { SocialPageModule };
//# sourceMappingURL=social.module.js.map