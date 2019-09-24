import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IntrosliderPage } from './introslider.page';
const routes = [
    {
        path: '',
        component: IntrosliderPage
    }
];
let IntrosliderPageModule = class IntrosliderPageModule {
};
IntrosliderPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [IntrosliderPage]
    })
], IntrosliderPageModule);
export { IntrosliderPageModule };
//# sourceMappingURL=introslider.module.js.map