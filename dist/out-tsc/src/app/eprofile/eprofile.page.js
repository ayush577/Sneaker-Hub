import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera } from "@ionic-native/camera/ngx";
import { ToastController } from "@ionic/angular";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../api/user.service";
import { Router } from "@angular/router";
let EprofilePage = class EprofilePage {
    constructor(formBuilder, authservice, router, toastController, actionSheetController, camera) {
        this.formBuilder = formBuilder;
        this.authservice = authservice;
        this.router = router;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.defaultImage = "../../assets/icon/man.svg";
        this.user = {
            picture: ""
        };
        this.messageResponseData = {};
        this.updateProfileform = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            address: ["", []]
        });
        this.data = {
            userid: "",
            picture: "",
            fullname: "",
            email: " ",
            mobileNumber: " ",
            address: ""
        };
    }
    ngOnInit() { }
    getProfileInfo() {
        console.log("Get ProfileInfo Called");
        let localStorageData = localStorage.getItem("obj");
        let alldata = JSON.parse(localStorageData);
        console.log("User ID .........", alldata.userid);
        this.base = this.authservice.getProfileInfo(alldata.userid);
        this.call = this.base.subscribe(data => {
            console.log(data);
            this.data.fullname = data.userprofile.name;
            this.data.email = data.userprofile.email;
            this.data.mobileNumber = data.userprofile.number;
            this.data.address = data.userprofile.newuseraddress;
            console.log("User Address", this.data.address);
            if (data.userprofile.user_picture !== "null") {
                this.user.picture = data.userprofile.user_picture;
            }
            else {
                this.user.picture = this.defaultImage;
            }
        });
    }
    ionViewWillEnter() {
        this.getProfileInfo();
    }
    updateProfile() {
        if (this.updateProfileform.valid) {
            let id;
            console.log("updateProfile Called", this.data);
            let localStorageData = localStorage.getItem("obj");
            let alldata = JSON.parse(localStorageData);
            console.log("User ID .........", alldata.userid);
            this.data.userid = alldata.userid;
            (this.base = this.authservice
                .updateProfile(this.data)
                .subscribe((data = []) => {
                console.log("EditProfile Response", data);
                if (data.status === 200) {
                    this.authservice.presentToast(data.success);
                    this.router.navigate(["/home"]);
                }
            })),
                err => {
                    console.log(err);
                    this.authservice.presentToast("Something went wrong Please try again");
                };
        }
    }
    getpicture() {
        console.log("GetPicture called");
    }
    updateProfilePic() {
        const alldata1 = localStorage.getItem("obj");
        const alldata = JSON.parse(alldata1);
        // const options: CameraOptions = {
        //   quality: 50,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   encodingType: this.camera.EncodingType.JPEG,
        //   mediaType: this.camera.MediaType.PICTURE,
        //   correctOrientation: true
        //   //sourceType: sourceType
        // };
        // this.camera.getPicture(options).then(
        //   imageData => {
        //     this.imageData = imageData;
        //   },
        //   err => {
        //     console.log("error in get pictre");
        //   }
        // );
        // console.log("id is ", alldata.userid, "base64 image", this.imageData);
        this.base = this.authservice
            .updateProfileImage(alldata.userid, this.imageData)
            .subscribe(data => {
            console.log(data);
        });
    }
    //--------------------------------------------------------------
    imageOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: "",
                mode: 'md',
                buttons: [
                    {
                        text: "Open Camera",
                        role: "destructive",
                        icon: "md-camera",
                        handler: () => {
                            this.openCamera();
                        }
                    },
                    {
                        text: "Open Gallery",
                        icon: "md-image",
                        handler: () => {
                            this.openGallery();
                        }
                    },
                    {
                        text: "Cancel",
                        icon: "close",
                        role: "cancel",
                        handler: () => {
                            console.log("Cancel clicked");
                        }
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
    openCamera() {
        const options = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 80,
            targetWidth: 150,
            allowEdit: true,
            targetHeight: 150,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(imageData => {
            this.data.image = 'data:image/jpeg;base64,' + imageData;
            this.imageData = this.data.image;
            //console.log(this.data.image);
            if (this.imageData) {
                this.user.picture = this.imageData;
                this.updateProfilePic();
                console.log("Camera console");
            }
        }, err => {
            this.messageResponseData.msg = this.data.errors;
            this.userProfileMessage();
        });
    }
    openGallery() {
        const options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 80,
            targetWidth: 150,
            allowEdit: true,
            targetHeight: 150,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(imageData => {
            this.data.image = 'data:image/jpeg;base64,' + imageData;
            this.imageData = this.data.image;
            if (this.imageData) {
                this.user.picture = this.imageData;
                this.updateProfilePic();
                console.log("Gallery console");
            }
        }, err => {
            this.messageResponseData.msg = this.data.errors;
            this.userProfileMessage();
        });
    }
    userProfileMessage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: this.messageResponseData.msg,
                duration: 2000,
                position: "top",
                animated: true,
                cssClass: "toast_alert-color"
            });
            toast.present();
        });
    }
};
EprofilePage = tslib_1.__decorate([
    Component({
        selector: "app-eprofile",
        templateUrl: "./eprofile.page.html",
        styleUrls: ["./eprofile.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        UserService,
        Router,
        ToastController,
        ActionSheetController,
        Camera])
], EprofilePage);
export { EprofilePage };
//# sourceMappingURL=eprofile.page.js.map