import { Component, OnInit } from "@angular/core";
import { ActionSheetController, AlertController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ToastController } from "@ionic/angular";

import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from "@angular/forms";
import { UserService } from "../api/user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-eprofile",
  templateUrl: "./eprofile.page.html",
  styleUrls: ["./eprofile.page.scss"]
})
export class EprofilePage implements OnInit {
  defaultImage = "../../assets/icon/man.svg";
  updateProfileform: FormGroup;
  imageData: any;
  editProfileData: { userid: "50"; fullname: " "; email: " "; address: " " };
  data;
  user = {
    picture: ""
  };
  base;
  call;
  messageResponseData: any = {};
  tempPicture:any;
  constructor(
    private formBuilder: FormBuilder,
    public authservice: UserService,
    private router: Router,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private alertController :AlertController
  ) {
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

  ngOnInit() {}
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
        this.tempPicture = data.userprofile.user_picture;
        console.log("if block pic exist", this.tempPicture )
      } else {
        console.log("if block no pic exist", this.defaultImage)
        this.user.picture = this.defaultImage;
      }
    });
  }
  ionViewWillEnter() {
    this.getProfileInfo();
  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
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
        .subscribe((data: any = []) => {
          console.log("EditProfile Response", data);
          if (data.status === 200) {
            console.log( "toast error", data.success);
            
            this.authservice.presentToast(data.success);
            this.router.navigate(["/home"]);
          }
        })),
        err => {
          console.log(err);
          this.authservice.presentToast(
            "Something went wrong Please try again"
          );
        };
    }
  }
  updateProfilePic() {
    console.log("upload function start" , this.imageData);
    
    const alldata1: any = localStorage.getItem("obj");
    const alldata = JSON.parse(alldata1);
    this.base = this.authservice
      .updateProfileImage(alldata.userid, this.imageData)
      .subscribe((data:any) => {
       if(data.status === 200){
         this.authservice.presentToast(data.success);
       } else{
         this.authservice.presentToast(data.error);
       }
      });
  }

  //--------------------------------------------------------------
  async imageOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: "",
      mode:'md',
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
    await actionSheet.present();
  }

  openCamera() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 80,
      targetWidth: 150,
      allowEdit: true,
      targetHeight: 150,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.data.image ='data:image/jpeg;base64,' + imageData;
        this.imageData = imageData;
        //console.log(this.data.image);
          this.user.picture = this.data.image;
          this.presentAlertConfirm();
          console.log("Camera console");
        
      },
      err => {
        if(err==20){
          this.authservice.presentToast("Please give permission in settings > app setting > sneakerhub > permissions in order to access camera");
        }else{
          this.authservice.presentToast(err);
        }
      
      }
    );
  }

  openGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 80,
      targetWidth: 150,
      allowEdit: true,
      targetHeight: 150,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.data.image = 'data:image/jpeg;base64,'+ imageData;
        this.imageData = imageData;
          this.user.picture = this.data.image;
          this.presentAlertConfirm();
          console.log("Gallery console");
      },
      err => {
        if(err==20){
          this.authservice.presentToast("Please give permission in settings > app setting > sneakerhub > permissions in order to access camera");
        }else{
          this.authservice.presentToast(err);
        }
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode:'md',
      message: 'Do you want to upload this picture ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.user.picture=this.tempPicture;
          }
        }, {
          text: 'Yes',
          handler: () => {

            this.updateProfilePic();
          }
        }
      ]
    });

    await alert.present();
  }
}
