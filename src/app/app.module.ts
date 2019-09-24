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
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NoInternetPageModule } from './no-internet/no-internet.module'
import { VirtualPageModule } from './virtual/virtual.module'
import { Network } from '@ionic-native/network/ngx'
import { NetworkService } from './net/network.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
@NgModule({
  declarations: [AppComponent,],
  entryComponents: [ ],
  imports: [BrowserModule, IonicModule.forRoot( {mode: 'ios',scrollAssist: false,scrollPadding: false}), AppRoutingModule,ReviewPageModule,HttpClientModule,NoInternetPageModule,VirtualPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    NetworkInterface,
    CallNumber,
    Camera,
    FCM,
    Network,
    CameraPreview,
    UniqueDeviceID,
    NetworkService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
