import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UtilService } from '../../../services/utilservice' ;
import { CredService } from '../../../services/credservice' ;
import { LoginPage } from '../login/login' ;
import 'rxjs/add/operator/finally';


@Component({
  templateUrl: 'loginfirststep.html'
 })
export class LoginFirstStepPage {

    companyName: string;

    constructor(private credService: CredService, private navCtrl: NavController, private utilService: UtilService, private loadingCtrl: LoadingController) {
    }

    login() {
        let obs = this.credService.loginCompany(this.companyName);
                     
        this.utilService.load('Getting company info...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData(null, () => {this.navCtrl.push(LoginPage);}),
                    this.utilService.handleIncomingError(null)
                );
                
           /* obs.finally(() => this.utilService.dismiss())
               .subscribe(
                    data => {
                        if(data.errorMessage) {
                            alert("ERROR RESPONSE: " + data.errorMessage);
                            return;
                        }
                        this.navCtrl.push(LoginPage);
                    },
                    error => {
                        alert("ERROR: " + error);
                    }
                ) */
         });
    }
}

