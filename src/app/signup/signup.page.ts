import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Events } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  data: any = {};
  response: any;
  signUpResponse: any = {};
  messageResponseData: any = {};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  registererrorsmsg='';
  registererrors;
  base;
  call;
  myData;
  IP: any = {
    ipaddress:'',
    usertoken:''
  };
  Subnet:any;
  uniqueDeviceId:any ={device_id:''};
  validation_messages = {
    'name': [
      { type: 'required', message: ' Name is required.' },
    ], 
  'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must contain valid email pattern.' }
    ], 
  'password' : [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 6 characters long.' },
   
  ]
  }

  constructor(private networkInterface: NetworkInterface, private router: Router, public menuCtrl:MenuController,private formBuilder: FormBuilder, private route: ActivatedRoute, public events: Events, public httpClient: HttpClient, public authservice: UserService) {
    
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  
  }
  
 

  ngOnInit() {
    //getting IP address
    
    this.networkInterface.getCarrierIPAddress()
    .then((address) => {
      this.IP.ipaddress =address.ip; 
      this.Subnet=address.subnet;
    })
    .catch(
      
      error => {console.error(`Unable to get IP: ${error}`)
      this.networkInterface.getWiFiIPAddress()
      .then((address) => {
        this.IP.ipaddress =address.ip; 
        this.Subnet=address.subnet;
      })
      .catch(
        error => {console.error(`Unable to get IP: ${error}`)
        this.httpClient.get<{ ip: string }>('https://jsonip.com')
        .subscribe(data => {
          console.log('Ip address ', data);
          this.IP.ipaddress = data.ip;
         
        })
      });  
    });
        
    // //get device id code
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
    this.signupForm.reset();
    this.router.navigateByUrl('/demo');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

 


  register() {
    

    console.log(this.IP);
    if (this.signupForm.valid) {
     
      this.authservice.presentLoading();
      this.IP.usertoken = localStorage.getItem("usertoken");
      let senddata = { ...this.data, ...this.IP};
      this.myData = JSON.stringify(senddata);
      //console.log(this.myData);

      this.base = this.authservice.saveSignup(this.myData);
      this.call = this.base.subscribe(
        data => {

          localStorage.setItem("obj",JSON.stringify(data));
          //let localStorageData = localStorage.getItem('obj');
          //let alldata = JSON.parse(localStorageData);
          
          if (data.status === 200) {
            this.authservice.loadingDismiss();
            let usermesssage= "Registration Success " + " " + data.success; 
            this.authservice.presentToast(usermesssage);
            this.signupForm.reset();
            this.router.navigate(['/home']);

          }
          else {
            this.authservice.loadingDismiss();
            this.authservice.presentToast(data.error);
         
          }


          // let localStorageData=localStorage.getItem('obj');
          // let alldata = JSON.parse(localStorageData);
          // console.log("User ID",alldata.userid);

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
  }
}
