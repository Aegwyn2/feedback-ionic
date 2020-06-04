import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { UtilService } from '../../../services/utilservice' ;
import { CreateProfilePage } from '../createprofile/createprofile' ;
import 'rxjs/add/operator/finally';


@Component({
  templateUrl: 'joingroup.html'
 })
export class JoinGroupPage {

    tenants: any[];

    constructor(private credService: CredService, private utilService: UtilService, private navCtrl: NavController) {
    }

    public toCreateProfile(tenant) {
        this.credService.tenantId = tenant.tenantId;
        this.credService.companyName = tenant.companyName;
        this.navCtrl.push(CreateProfilePage);
    }

    ionViewWillEnter() {
        let obs = this.credService.getGroupList();
        let hicFunction = this.utilService.handleIncomingData(null, null);
        let dhFunction = data => {
            hicFunction(data);
            if(data && (!data.errorMessage))
                this.tenants = data.listTenant
        }
        this.utilService.load('Getting groups information...', () => {
            obs.subscribe (
                    dhFunction,
                    this.utilService.handleIncomingError(null)
                );
                
            /* obs.finally(() => this.utilService.dismiss())
               .subscribe(
                    data => {
                        if(data.errorMessage) {
                                alert("ERROR RESPONSE: " + data.errorMessage);
                                return;
                        }
                        console.log()
                        this.tenants = data.listTenant;
                    },
                    error => {
                        alert("ERROR: " + error);
                    }
                ); */
        });
    }
 }