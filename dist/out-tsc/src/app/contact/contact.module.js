import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactPage } from './contact.page';
const routes = [
    {
        path: '',
        component: ContactPage
    }
];
let ContactPageModule = class ContactPageModule {
};
ContactPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ContactPage]
    })
], ContactPageModule);
export { ContactPageModule };
//# sourceMappingURL=contact.module.js.map