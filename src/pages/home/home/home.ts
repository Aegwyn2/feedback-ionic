import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { FAQPagesGroup } from '../../feedback/faqpagesgroup/faqpagesgroup' ;
import { ComplaintPagesGroup } from '../../feedback/complaintpagesgroup/complaintpagesgroup' ;
import { SuggestionPagesGroup } from '../../feedback/suggestionpagesgroup/suggestionpagesgroup' ;
import { InvitePage } from '../../cred/invite/invite' ;
import { UtilService } from '../../../services/utilservice' ;

@Component({
  templateUrl: 'home.html'
 })
export class HomePage {

    showProfile: boolean = false;
    userName: String;
    currentView: string = 'faq';
    @ViewChild('faqPagesGroup') faqPagesGroup: FAQPagesGroup
    @ViewChild('complaintPagesGroup') complaintPagesGroup: ComplaintPagesGroup
    @ViewChild('suggestionPagesGroup') suggestionPagesGroup: SuggestionPagesGroup
    
    constructor(private credService: CredService, private utilService: UtilService, private navCtrl: NavController) {
    }

    public toInvitePage() {
        this.navCtrl.push(InvitePage);
    }

    public showFAQ() {
        this.faqPagesGroup.init();
        this.currentView = 'faq';
    }

    public showComplaint() {
        this.complaintPagesGroup.init();
        this.currentView = 'complaint';
    }

    public showSuggestion() {
        this.suggestionPagesGroup.init();
        this.currentView = 'suggestion';
    }
    
    public logout() {
        let obs = this.credService.logout();
        this.utilService.load('Logging out...', () => {
            obs.finally(() => {this.navCtrl.popToRoot();})
               .subscribe (
                    this.utilService.handleIncomingData(null, null),
                    this.utilService.handleIncomingError(null)
                );
        });
    }
    
    public disableShowProfile() {
        console.log("DISABLE CALLED");
        this.showProfile = false;
    }
    
    public toogleProfile(evt: any) {
        this.showProfile = !this.showProfile;
        evt.stopPropagation();
    }

    ionViewWillEnter(){
        this.userName = this.credService.userName;
        this.faqPagesGroup.init();
    }
 }