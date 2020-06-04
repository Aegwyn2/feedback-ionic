import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { UtilService } from '../../../services/utilservice' ;
import 'rxjs/add/operator/finally';

@Component({
  templateUrl: 'invite.html'
 })
export class InvitePage {

    emails: any[] = [{value: ""}];

    constructor(private credService: CredService, private utilService: UtilService, private navCtrl: NavController) {
    }

    public add() {
        this.emails.push({value: ""});
    }

    public delete(index) {
        if(this.emails.length <= 1)
            return;
            
        this.emails.splice(index,1);
    }


    public invite() {
        let obs = this.credService.inviteUsers(this.emails);
        this.utilService.load('Sending mails...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData('Mails were sent successfully', () => {this.navCtrl.pop();}),
                    this.utilService.handleIncomingError(null)
                ); 
            
           /* obs.finally(() => this.utilService.dismiss())
               .subscribe(
                    data => {
                        if(data.errorMessage) {
                            alert("ERROR RESPONSE: " + data.errorMessage);
                            return;
                        }
                        alert("SUCCESSFUL");
                        this.navCtrl.pop();
                    },
                    error => {
                        alert("ERROR: " + error);
                        this.navCtrl.pop();
                    }
                ); */
        });
    }
    
    public validateEmails(): boolean {
        for(let i=0;i<this.emails.length;i++) {
            if(!this.emails[i].value) {
                return false;
            }
        }
        return true;
    }
    
 }