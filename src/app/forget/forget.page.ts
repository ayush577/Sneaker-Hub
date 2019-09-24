import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router, } from "@angular/router";
import { UserService } from '../api/user.service';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  forgetPass: FormGroup;
  data: any = {};
  isSent: boolean = false;
  base;
  call;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must contain valid email pattern.' }
    ]
  }

  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient, private router: Router, public authservice: UserService, public menuCtrl: MenuController) {
    this.forgetPass = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit() {
  }
  back() {

    console.log("back Method is Called");
    this.forgetPass.reset();
    this.router.navigateByUrl('/login');
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  forgetuserpassword() {
    if (this.forgetPass.valid) {

      

     this.base=this.authservice.forgetpassword(this.data.email).subscribe((data:any)=>{
       console.log(data);
        if(data.status===200){
          this.isSent= true;
          setTimeout(()=>{
            this.router.navigateByUrl('/login');
            
          },3000
          )

        }
        else {
          this.authservice.presentToast(data.error);
        }
      })
      




    }





  }
}
