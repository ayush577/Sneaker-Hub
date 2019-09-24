import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearchbarPage } from './searchbar.page';
const routes = [
    {
        path: '',
        component: SearchbarPage
    }
];
let SearchbarPageModule = class SearchbarPageModule {
};
SearchbarPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [SearchbarPage]
    })
], SearchbarPageModule);
export { SearchbarPageModule };
//# sourceMappingURL=searchbar.module.js.map