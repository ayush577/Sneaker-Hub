import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service'
import { MenuController } from '@ionic/angular'
@Component({
  selector: 'app-introslider',
  templateUrl: './introslider.page.html',
  styleUrls: ['./introslider.page.scss'],
})
export class IntrosliderPage implements OnInit {
  @ViewChild(IonSlides,null) slides :IonSlides;
  skipMsg: string = "SKIP";
  time:any;
  date1:any;
  constructor(private router: Router,public authservice : UserService, public menuCtrl :MenuController) { 
   
    this.time=setInterval(() => {
      this.showTime();
    }, 1000);
  }

  ngOnInit() {
    this.menuCtrl.enable(false,"1");
    console.log('menu', this.menuCtrl.enable)
    if(localStorage.getItem('introForUser')){
        this.router.navigate(['/home'])
    }


    localStorage.setItem('introForUser','true');




  }

  skip(){
    this.router.navigate(['/authenticity'])
  }

  slideChange(){

    // if( this.slides.isEnd()){
    //   this.skipMsg = "Alright, I Got it"
    // }

  }
  next(){
    this.slides.slideNext(700,true);
  }

  theEnd(){
    this.authservice.presentLoading().then(()=>{
      this.authservice.loadingDismiss();
      this.router.navigate(['/authenticity'])
    })
    
  }
 

   showTime() {
    
     let h:any;
     let m:any;
     let s:any;
     let mm:any;
     let dd:any;
     let yy:any;
    var time = new Date();
     h = time.getHours(); // 0 - 23
     m = time.getMinutes(); // 0 - 59
     s = time.getSeconds(); // 0 - 59
    var date =new Date();
    mm = date.toLocaleString('default', { month: 'long' });
    dd = date.getUTCDate();
    yy = date.getUTCFullYear();
    var session = "AM";
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        session = "PM";
    } 
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
      this.time = h + ":" + m + ":" + s + " " + session;
      this.date1 = mm + " " + dd + ", " + yy; 
       
}






}
