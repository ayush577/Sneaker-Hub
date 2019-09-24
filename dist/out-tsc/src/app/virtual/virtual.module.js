import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VirtualPage } from './virtual.page';
const routes = [
    {
        path: '',
        component: VirtualPage
    }
];
let VirtualPageModule = class VirtualPageModule {
};
VirtualPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [VirtualPage]
    })
], VirtualPageModule);
export { VirtualPageModule };
//# sourceMappingURL=virtual.module.js.map