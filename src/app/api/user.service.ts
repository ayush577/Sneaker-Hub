import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading;

  apiUrl = "https://dev.hawkscode.com.au/sneaker/Webservice";

  constructor(private http: HttpClient, public loadingController: LoadingController, public toastController: ToastController) { }


  saveSignup(sign) {//SignUp API
    //console.log('service', sign);
    return this.http.post(`${this.apiUrl}/registeruserdata`, sign);
  } // End SignUp API



  userLogin(ulog) {//Login API
    return this.http.post(`${this.apiUrl}/loginuser`, ulog);
  }//End Login API

  contactUs(contactdata) {//contactUs API Start

    return this.http.post(`${this.apiUrl}/contactusadmin`, contactdata);

  }//contactUs API End 

  getUserDetailImageName(userDetail) {//UserDetial API Start UserName UserImage

    //console.log("Service data", userDetail);
    let obj = { userid: userDetail };
    return this.http.post(`${this.apiUrl}/getuserprofilenameimage`, obj);

  }//UserDetial End UserName UserImage




  async presentLoading() {//Loding Controller Start 
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'crescent',
      // message: '<div class="loading"><img src="../../assets/loading.gif"></div>',
      mode: "md",
      cssClass: 'custom-loading',
    }).then(a => { a.present() })

  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }// End Loding Controlller 
  

  async presentToast(toastMessage) {//Toast Controller Start  
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'bottom',
      duration: 2000,
      cssClass : 'customToast'
    });
    return toast.present();
  }//Toast Controller End


  getProfileInfo(userid1) {
    console.log("getProfileInfo called ID is ", userid1);
    let obj = { userid: userid1 };
    let data = JSON.stringify(obj);
    return this.http.post(`${this.apiUrl}/getuserprofiledata`, data);


  }
  getCategoryData(menid) {
    console.log(menid);
    let obj = { tbl_category_id: menid }
    return this.http.post(`${this.apiUrl}/getcatalogproducts`, obj);

  }

  getAllCategories(id1) {

    const obj = {
      tbl_category_id: id1

    };
    const obj2 = JSON.parse(obj.tbl_category_id);
    return this.http.post('https://dev.hawkscode.com.au/sneaker/Webservice/getcatalogproducts', obj);
  }

  getcategoryname() {
    return this.http.post(`${this.apiUrl}/getallcategories`, {});

  }

  forgetpassword(email1) {
    const obj = { email: email1 };
    return this.http.post(`${this.apiUrl}/forgetuserpassword`, obj);
  }
  demopageslider() {
    return this.http.post(`${this.apiUrl}/gethomescreenimage`, {});
  }
  getnumber() {
    return this.http.post(`${this.apiUrl}/getadminnumber`, {});
  }
  upcomingProduct() {
    return this.http.post(`${this.apiUrl}/getupcomigproducts`, {});
  }

  updateProfile(obj) {
    return this.http.post(`${this.apiUrl}/updateuserprofile`, obj)
  }
  getProductDetial(id) {
    const obj = { tbl_product_id: id };
    return this.http.post(`${this.apiUrl}/getproductdetails`, obj);
  }
  updateProfileImage(id,userimage){
    const obj={userid:id, image:userimage}
    return this.http.post(`${this.apiUrl}/updateprofileimage`,obj);

  }
  getSearchResult(data) {
    console.log(data);
    
    const obj = { search: data };
    console.log('getSearchResult called');
    return this.http.post(`${this.apiUrl}/getsearchdata`, obj);
  }
  getvideos(){
    return this.http.post(`${this.apiUrl}/getallvideos`, {});
  }

  getModel(product_id){

    const obj ={tbl_product_id :product_id};
  return this.http.post(`${this.apiUrl}/getmodellink`,obj);
   }
}
