import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Platform, IonSlides, IonSlide } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss']
})

export class DemoPage implements OnInit {
  
 
  base;
  call;
  productId=46;
  mobileno: any;
  CategoryData: any = [];
  slideData: any = [];
  Releases: any = [];
  subscription:any;
  slideOpts = {
    initialSlide: 0,
    speed: 2000
  };
  
  constructor(
    public router :Router,
    public platform :Platform,
    public menuCtrl: MenuController,
    private callNumber: CallNumber,
    public alertController: AlertController,
    public authService: UserService
  ) { }

  ngOnInit() {
    this.getDemoData();
    this.getmobilenumber();
  }

  async callPopUp() {
    const alert = await this.alertController.create({
      header: 'Call To The Store',
      mode: 'md',
      message: 'Tab on call button to make a call',
      cssClass: 'primary',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'call',
          cssClass: 'secondary',
          handler: () => {
            this.makecall();
          }
        }
      ]
    });

    await alert.present();
  }

  getmobilenumber() {
    this.authService.getnumber().subscribe((data: any = []) => {
      this.mobileno = data.adminnumber.store_number;
      console.log('admin number is', this.mobileno);
    });
  }
  getDemoData() {
    this.authService.demopageslider().subscribe((data: any = []) => {
      this.slideData = data.responsehomeimages;
      this.Releases = data.responsenewreleaseimage;
      
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    
  }
  slidesDidLoad(slides) {
    slides.startAutoplay();
  }

  makecall() {
    this.callNumber
      .callNumber(this.mobileno, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err =>
        console.log('try calling on ', this.mobileno, ' but ', err)
      );
  }
  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
}

ionViewWillLeave(){
    this.subscription.unsubscribe();
}
async virtual(){
  // const modal = await this.modalCtrl.create({
  //   component: VirtualPage,
  //   componentProps: {
  //     data: this.slideData
  //   }
  // });

  // return await modal.present();
  this.router.navigate(['/virtual',this.productId]);
  // this.router.navigate(["/details", id]);
}
}
