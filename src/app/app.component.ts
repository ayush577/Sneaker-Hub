import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController, Platform, ModalController, Events } from "@ionic/angular";
import { UserService } from "./api/user.service";
import { NavController } from "@ionic/angular";
import { FCM } from '@ionic-native/fcm/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NoInternetPage } from './no-internet/no-internet.page';
import { NetworkService } from './net/network.service';

@Component({  
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  user: any = [];
  defaultImageUrl = "./assets/icon/man.svg";
  appMenuItems = [];
  Categories = [];
  userData;
  base;
  isUserLoggedIn = false;
  isHomepage = false;
  constructor(
    private fcm: FCM,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    public authservice: UserService,
    public navCtrl: NavController,
    private network: Network,
    public modalCtrl: ModalController,
    public networkProvider:NetworkService,
    public eventCtrl: Events,
  ) {
    this.networkProvider.initializeNetworkEvents();
    // Offline event
    this.eventCtrl.subscribe('network:offline', () => {
      this.modalStart();
    });
    // Online event
    this.eventCtrl.subscribe('network:online', () => {
      this.modalClose();  
    });
    this.user = {
      login: false,
      picture: "",
      name: ""
    };

    this.appMenuItems = [
      {
        title: "Home",
        component: "/home",
        icon: "../assets/icon/menu_icon/home.png"
      },
      {
        title: "Category",
        component: "/category",
        icon: "../assets/icon/menu_icon/category.png"
      },
      {
        title: "Upcoming Products",
        component: "/upcoming",
        icon: "../assets/icon/menu_icon/upcoming.png"
      },
      {
        title: "Profile",
        component: "/profile",
        icon: "../assets/icon/menu_icon/profile.png"
      },
      {
        title: "Social Platform",
        component: "/social",
        icon: "../assets/icon/menu_icon/social.png"
      },
      {
        title: "Videos",
        component: "/videos",
        icon: "../assets/icon/menu_icon/play.png"
      },
      {
        title: "About us",
        component: "/about",
        icon: "../assets/icon/menu_icon/about.png"
      },
      {
        title: "Contact Us",
        component: "/contact",
        icon: "../assets/icon/menu_icon/contact.png"
      }
    ];
    const userId = localStorage.getItem("obj");
    this.userData = JSON.parse(userId);
    console.log("userdata in app component", this.userData);
    this.initializeApp();
    this.getUserInfo();
    this.getcategoryname();

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#000000');
    this.splashScreen.hide();
    this.networkProvider.initializeNetworkEvents();

   
    const userId = localStorage.getItem("obj");
    this.userData = JSON.parse(userId);
      if (this.userData === null || this.userData === undefined) {
        this.isUserLoggedIn = false;
        // this.router.navigate(['/authenticity'])
        this.router.navigate(["/demo"]);
      } else {
        this.isUserLoggedIn = true;
        this.statusBar.backgroundColorByHexString('#09163d');
        this.router.navigate(["/home"]);
      }

      //push notification code
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background",data);
          this.router.navigate(["/details", data.productid]);
        } else {
          console.log("Received in foreground",data);
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("token onTokenRefresh() id is :" , token); 
        localStorage.setItem("usertoken",token);

        
      });
      this.getToken() ;
    });
  }
  openPage(menuData) {
    this.router.navigate([menuData.component]);
    this.menuCtrl.close();
  }
  openCategory(menuData) {
     this.menuCtrl.close();
    this.router.navigate([menuData.component]);
  }
  logOut() {
    localStorage.removeItem("obj");
    if (localStorage.getItem("obj") === null) {
      this.authservice.presentToast("Logout Success");
      this.router.navigate(["/login"]);
      this.getUserInfo();
      this.statusBar.backgroundColorByHexString('#000000');
    }
  }
  videos() {
    this.menuCtrl.close();
    this.router.navigate(["/videos"]);
  }
  openhome(id) {
    
    this.router.navigate(["/home"], {
      queryParams: id
    });
  }

  getUserInfo() {
    const userId = localStorage.getItem("obj");
    this.userData = JSON.parse(userId);
    if (this.userData === null || this.userData === undefined) {
      this.isUserLoggedIn = false;
      // this.menuCtrl.enable(true, 'second');
      console.log("if user is not log in ", this.isUserLoggedIn);
    } else {
      this.isUserLoggedIn = true;
      // this.menuCtrl.enable(true, 'first');
      console.log("if user is log in", this.isUserLoggedIn);
      const localStorageData = localStorage.getItem("obj");
      const alldata = JSON.parse(localStorageData);
      this.base = this.authservice
        .getUserDetailImageName(alldata.userid)
        .subscribe((data: any = []) => {
          this.user.name = data.getuserprofilename.user_name;
          if (data.getuserprofilename.imageurl !== "null") {
            this.user.picture = data.getuserprofilename.imageurl;
          } else {
            this.user.picture = this.defaultImageUrl;
          }
        });
    }
  }
  homedemo() {
    this.router.navigate(["/demo"]);
    this.menuCtrl.close();
  }
  getcategoryname() {
    this.Categories = [];
    console.log("check data", this.Categories);
    this.base = this.authservice.getcategoryname().subscribe((data: any) => {
      console.log("All Categories Data", data);
      if (data !== null) {
        console.log("check data  asdf", this.Categories);
        if (this.Categories === undefined || this.Categories.length === 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.allcategories.length; i++) {
            this.Categories.push(data.allcategories[i]);
          }
        }
      }
    });
  }

  //push notification
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      console.log("token is :" , token);     
      localStorage.setItem("usertoken",token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }


  async modalStart() {
    const modal = await this.modalCtrl.create({
      component: NoInternetPage,
    });
    return await modal.present().then(() => {
   });
  }
  modalClose(){
    this.modalCtrl.dismiss().then(() => {
   });
  }  
 
}
