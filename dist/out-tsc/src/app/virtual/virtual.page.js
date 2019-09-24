import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
let VirtualPage = class VirtualPage {
    constructor(modalCtrl, cameraPreview, platform) {
        this.modalCtrl = modalCtrl;
        this.cameraPreview = cameraPreview;
        this.platform = platform;
        // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
        const cameraPreviewOpts = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
        };
        // start camera
        this.cameraPreview.startCamera(cameraPreviewOpts).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
    ngOnInit() {
    }
    // startPreview(){
    //   const cameraPreviewOpts: CameraPreviewOptions = {
    //     x: 0,
    //     y: 0,
    //     width: window.screen.width,
    //     height: window.screen.height,
    //     camera: 'rear',
    //     tapPhoto: true,
    //     previewDrag: true,
    //     toBack: true,
    //     alpha: 1
    //   }
    //   this.cameraPreview.startCamera(cameraPreviewOpts).then(
    //     (res) => {
    //       console.log("hello 123 ",res)
    //     },
    //     (err) => {
    //       console.log('error is ',err)
    //     });
    //   }
    takepicture() {
        // picture options
        const pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        };
        // take a picture
        this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            this.picture = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log("take picture from camera", err);
            this.picture = 'assets/img/test.jpg';
        });
        //   this.cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
        //     this.picture = 'data:image/jpeg;base64,' + imageData;
        //   }, (err) => {
        //     console.log(err);
        //     this.picture = 'assets/img/test.jpg';
        //   });
    }
    closemodal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
    ionViewWillLeave() {
        this.cameraPreview.stopCamera();
    }
};
VirtualPage = tslib_1.__decorate([
    Component({
        selector: 'app-virtual',
        templateUrl: './virtual.page.html',
        styleUrls: ['./virtual.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController, CameraPreview, Platform])
], VirtualPage);
export { VirtualPage };
//# sourceMappingURL=virtual.page.js.map