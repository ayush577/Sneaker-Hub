import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {
  CategoryData: any;
  category1: string;
  constructor(public loadingController: LoadingController,public router :Router) {
    this.CategoryData=[
      {S_name:"Air Jordan V (5) Retro",s_id:1,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:2,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:3,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:4,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:5,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:6,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:7,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:8,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:9,s_price:189.99},
      {S_name:"Air Jordan V (5) Retro",s_id:10,s_price:189.99},
    ];
   }

  ngOnInit() {
  }
  segmentChanged(event) {
    this.presentLoading();
  }
  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  ionViewWillEnter() {
    this.category1 = 'instagram';
  }
}
