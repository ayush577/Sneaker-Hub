import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.page.html',
  styleUrls: ['./no-internet.page.scss'],
})
export class NoInternetPage implements OnInit {
  subscription:any;
  constructor( public platform: Platform, public modalCtrl : ModalController,private network: Network, public authService: UserService) { }

  ngOnInit() {
  }
  checkConnection(){
    if (this.network.type != 'unknown' && this.network.type != 'none') {
    this.modalCtrl.dismiss();
    }else{
      this.authService.presentToast(' Not connected yet :(')
    }
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
