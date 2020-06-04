
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilService } from '../../../services/utilservice' ;
import { CredService } from '../../../services/credservice' ;
import { HomePage } from '../../home/home/home' ;
import 'rxjs/add/operator/finally';

@Component({
  templateUrl: 'login.html'
 })
export class LoginPage {

    email: String;
    password: String;
    companyName: string ;

    constructor(private credService: CredService, private utilService: UtilService, private navCtrl: NavController) {}

    ionViewWillEnter() {
        this.companyName = this.credService.companyName;
    }


    login() {
        let obs = this.credService.login(this.email, this.password);
        this.utilService.load('Logging in...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData(null, () => {this.navCtrl.push(HomePage);}),
                    this.utilService.handleIncomingError(null)
                );
                
           /* obs.finally(() => this.utilService.dismiss())
               .subscribe (
                    data => {
                        if(data.errorMessage) {
                            alert("ERROR RESPONSE: " + data.errorMessage);
                            return;
                        }
                        this.navCtrl.push(HomePage);
                    },
                    error => {
                        alert("ERROR RESPONSE: " + error);
                        console.log("after error");
                    }
                ) */
        });
    }
 }