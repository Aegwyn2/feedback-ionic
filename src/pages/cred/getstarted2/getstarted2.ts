
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JoinGroupPage } from '../joingroup/joingroup';
import { Register2Page } from '../register2/register2';
import { CredService } from '../../../services/credservice' ;



@Component({
  templateUrl: 'getstarted2.html'
 })
export class GetStartedPage2 {
    constructor(private credService: CredService, private navCtrl: NavController) {
    }

    public toJoinGroupList() {
            this.navCtrl.push(JoinGroupPage);
    }

    public toRegister() {
            this.navCtrl.push(Register2Page);
    }
}