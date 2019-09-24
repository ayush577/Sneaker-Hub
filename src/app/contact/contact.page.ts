import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { UserService } from '../api/user.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactusform: FormGroup;
  submitted = false;
  data: any = {};
  myData;
  base;
  call;

  ngOnInit() {
    
  }

  constructor( private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder, public authservice: UserService) {
    this.contactusform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required]],
      message: ['', [Validators.required]],

    });
  }

  search(){
    console.log("icon method called");
    this.router.navigate(['/searchbar']);
  }
  
  contactUs() {
    this.authservice.presentLoading();
    if (this.contactusform.valid){
      
      this.myData = JSON.stringify(this.data);
      

      this.base = this.authservice.contactUs(this.myData);
      this.call = this.base.subscribe(
        data => {
          if(data.status==200){  
            this.authservice.presentToast(data.success);
            this.router.navigate(['/home']);
          }
          else {
            this.authservice.presentToast("Something is Wrong");
          }
          this.authservice.loadingDismiss();
        },
        err => {
          this.authservice.loadingDismiss();
          this.authservice.presentToast(err);
        },

      );
    }
  }

}
