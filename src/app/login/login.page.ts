import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms'
import { Events } from '@ionic/angular';
import { Location } from '@angular/common';
import { UserService } from '../api/user.service';
import { MenuController, Platform} from '@ionic/angular';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { HttpClient } from '@angular/common/http';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  data: any = {};
  loginerrors;
  loginerrorsmsg = '';
  loginResponse: any = {};
  messageResponseData: any = {};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  myData;
  base;
  subscription:any;
  call;
  uniqueDeviceId:any ={device_id:''};
  IP: any = {
            ipaddress:'',
            usertoken:''
          };
  Subnet:any = {};
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must contain valid email pattern.' }
    ], 
    'password' : [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
     
    ]
  }
  constructor(public platform :Platform,private location: Location, public httpClient: HttpClient, private router: Router, private networkInterface: NetworkInterface, private formBuilder: FormBuilder, private route: ActivatedRoute, public events: Events, public authservice: UserService,public menuCtrl:MenuController) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  
   
  }

  ngOnInit() {
    //getting IP address
    this.networkInterface.getCarrierIPAddress()
    .then((address) => {
      this.IP.ipaddress = address.ip; 
      this.Subnet=address.subnet;
    })
    .catch(
      
      error => {console.error(`Unable to get IP: ${error}`)
      this.networkInterface.getWiFiIPAddress()
      .then((address) => {
        this.IP.ipaddress=address.ip; 
        this.Subnet=address.subnet;
      })
      .catch(
        error => {console.error(`Unable to get IP: ${error}`)
        this.httpClient.get<{ ip: string }>('https://jsonip.com')
        .subscribe(data => {
          
          this.IP.ipaddress  = data.ip;
          
        })
      });  
    });
    

    // // get device id code
    // this.uniqueDeviceID.get().then((uuid: any) => {
    //   console.log("UUID of device", uuid);
    //  this.uniqueDeviceId.device_id=uuid;
    //  console.log("device unique Id is : ", this.uniqueDeviceId);
     
    // })
    // .catch((error: any) => {
    //   console.log(error)
    // });

  }

  back() {
    this.loginForm.reset();
    this.router.navigate(['/demo']);
  }

  hideShowPassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  login() {

    
    if (this.loginForm.valid) {

      this.authservice.presentLoading();

      this.IP.usertoken = localStorage.getItem("usertoken");
      this.data = { ...this.data, ...this.IP };
     
      this.myData = JSON.stringify(this.data);
     
      this.base = this.authservice.userLogin(this.myData);
      this.call = this.base.subscribe(
        data => {
          localStorage.setItem("obj",JSON.stringify(data));
          let localStorageData = localStorage.getItem('obj');
          let alldata = JSON.parse(localStorageData);
          
          if (alldata.status === 200) {
            this.authservice.loadingDismiss();
            this.authservice.presentToast(alldata.success);
            this.loginForm.reset();
            this.router.navigate(['/home']);

          }
          else {
            this.authservice.loadingDismiss();
            this.authservice.presentToast(alldata.error);
          }
        },
        err => {
          this.authservice.loadingDismiss();
          this.authservice.presentToast(err);
        },

      );

    }
  }
  ionViewWillEnter(){
    this.menuCtrl.enable(false);
    this.subscription = this.platform.backButton.subscribe(()=>{
      this.router.navigate(['/demo']);
    });
  }
}
