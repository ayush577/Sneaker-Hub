import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReviewPageModule } from './review/review.module';
import { UserService } from './api/user.service';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NoInternetPageModule } from './no-internet/no-internet.module';
import { VirtualPageModule } from './virtual/virtual.module';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './net/network.service';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [AppComponent,],
        entryComponents: [],
        imports: [BrowserModule, IonicModule.forRoot({ mode: 'ios', scrollAssist: false, scrollPadding: false }), AppRoutingModule, ReviewPageModule, HttpClientModule, NoInternetPageModule, VirtualPageModule],
        providers: [
            StatusBar,
            SplashScreen,
            UserService,
            NetworkInterface,
            CallNumber,
            Camera,
            FCM,
            Network,
            UniqueDeviceID,
            NetworkService,
            CameraPreview,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map