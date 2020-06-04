
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { Register2Page} from '../register2/register2'

@Component({
  templateUrl: 'register.html'
 })
export class RegisterPage {

    email: string;

    constructor(private navCtrl: NavController, private credService: CredService) {}

    public toRegister2() {
        this.credService.email = this.email;
        this.navCtrl.push(Register2Page);
    }

}