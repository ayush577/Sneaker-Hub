import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  
  slideOpts = {
    initialSlide: 1,
    speed:2000,     
  };
  slideData;
  image:any;
  constructor(private modalCtrl:ModalController,public navparms:NavParams) {
 
  
    
    this.slideData=this.navparms.get('data');
    this.image=this.slideData[0].imageurl;
    console.log("SlideData",this.slideData);
   }

  ngOnInit() {
    
  
    
    
    
  }

getActiveIndex(slides, i){
this.image  = this.slideData[i].imageurl;
}

  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
