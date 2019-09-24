import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Location } from "@angular/common";
import { ReviewPage } from "../review/review.page";
import { UserService } from "../api/user.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { VirtualPage } from '../virtual/virtual.page';
//import { setTimeout } from 'timers';
@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  base;
  productId;
  productprice;
  productname;
  sku;
  relesedate;
  description;
  history;
  postImage;
  mobileno;
  slideOpts = {
    initialSlide: 1,
    autoplay: true,
    loop: true,
    speed: 2000
  };
  slideData = [];
  colors: any = [];
  Size: any = [];

  constructor(
    public router :Router,
    public modalCtrl: ModalController,
    private location: Location,
    public authService: UserService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private callNumber: CallNumber
  ) {
    this.productId = this.route.snapshot.params.id;
    console.log(this.productId);
    this.getProductDetails(this.productId);
    this.getmobilenumber();
  }

  ngOnInit() {}
  back() {
    this.location.back();
  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }
  async callPopUp() {
    const alert = await this.alertController.create({
      header: "Call To The Store",
      mode: "md",
      message: "Tab on call button to make a call",
      cssClass: "primary",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "call",
          cssClass: "secondary",
          handler: () => {
            this.makecall();
          }
        }
      ]
    });

    await alert.present();
  }

  async reviewProduct() {
    console.log("reviewProduct", this.slideData);

    const modal = await this.modalCtrl.create({
      component: ReviewPage,
      componentProps: {
        data: this.slideData
      }
    });

    return await modal.present();
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

  getProductDetails(id) {
    this.authService.presentLoading();
    let id1 = id;
    console.log("GetProductDetails Called");
    this.base = this.authService
      .getProductDetial(id1)
      .subscribe((data: any) => {
        console.log(data);

        this.productprice = data.productdetails.tbl_product_price;
        this.productname = data.productdetails.tbl_product_name;
        this.Size = data.productdetails.tbl_product_sizes;
        this.colors = data.productdetails.tbl_product_colors;
        this.slideData = data.productdetails.tbl_product_images;
        this.postImage =data.productdetails.tbl_product_picture;
        this.sku = data.productdetails.tbl_product_sku;
        this.relesedate = data.productdetails.release_date;
        this.description = data.productdetails.tbl_product_desc;
        this.history = data.productdetails.tbl_product_history;
        this.authService.loadingDismiss();

        
      }),err=>{
        this.authService.loadingDismiss();
        this.authService.presentToast(err);
      };
      
  }
  getmobilenumber() {
    this.authService.getnumber().subscribe((data: any = []) => {
      this.mobileno = data.adminnumber.store_number;
      console.log("admin number is", this.mobileno);
    });
  }
  makecall() {
    this.callNumber
      .callNumber(this.mobileno, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err =>
        console.log("try calling on ", this.mobileno, " but ", err)
      );
  }
}
