
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GetStartedPage2 } from '../getstarted2/getstarted2' ;
import { RegisterPage } from '../register/register' ;
import { LoginFirstStepPage } from '../loginfirststep/loginfirststep' ;
import { CredService } from '../../../services/credservice' ;
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'getstarted.html'
 })
export class GetStartedPage {
  email:string = "";
  formData:FormData = new FormData();

  constructor(private credService: CredService, private navCtrl: NavController, private http: Http) {
  }
  
  toGetStarted2() {
        this.credService.email = this.email;
        this.navCtrl.push(GetStartedPage2);
  }

  toRegister() {
  	this.navCtrl.push(RegisterPage);
  }

  toLogin() {
  	this.navCtrl.push(LoginFirstStepPage);
  }
  
  
//  fileChange(event) {
//      console.log("FILE CHANGED");
//    let fileList: FileList = event.target.files;
//    if(fileList.length > 0) {
//        let file: File = fileList[0];
//        console.log('FILE: ' + file);
////        let formData:FormData = new FormData();
//        
//        this.formData.append('uploadFile', file, file.name);
//    }
//  }
//    
//    upload() {
//        let url = 'http://192.168.1.13:8080/stonefire/resource/upload';
//        let headers = new Headers();
//        /** No need to include Content-Type in Angular 4 */
////        headers.append('enctype', 'multipart/form-data'); 
//        headers.append('Accept', 'application/json');
//        let options = new RequestOptions({ headers: headers });
//        this.http.post(url, this.formData, options)
////            .map(res => res.json())
//            .catch(error => Observable.throw(error))
//            .subscribe(
//                data => console.log('success: ' + data),
//                error => console.log(error)
//            )
//    }
  
}