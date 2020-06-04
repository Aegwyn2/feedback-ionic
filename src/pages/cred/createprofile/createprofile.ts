import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { UtilService } from '../../../services/utilservice' ;
import { LoginFirstStepPage } from '../loginfirststep/loginfirststep' ;
import 'rxjs/add/operator/finally';


@Component({
  templateUrl: 'createprofile.html'
 })
export class CreateProfilePage {

    firstName: string;
    lastName: string;
    userName: string;
    password: string;

    constructor(private credService: CredService, private utilService: UtilService, private navCtrl: NavController) {
    }

    public createProfile() {
        let obs = this.credService.createProfile(this.firstName, this.lastName, this.userName, this.password);
        this.utilService.load('Creating profile...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData("Profile was created successfully", () => {
                        this.credService.clear();
                        this.navCtrl.push(LoginFirstStepPage);
                    }),
                    this.utilService.handleIncomingError(null)
                );
                
            /* obs.finally(() => this.utilService.dismiss())
                .subscribe(
                    data => {
                        if(data.errorMessage) {
                                alert("ERROR RESPONSE: " + data.errorMessage);
                                return;
                        }

                        alert("SUCCESSFUL")
                        this.credService.clear();
                        this.navCtrl.push(LoginFirstStepPage);
                    },
                    error => {
                        alert("ERROR: " + error);
                        this.navCtrl.pop();
                    }
                ); */
        });
    }
 }