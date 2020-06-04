import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { FAQPage } from '../faq/faq' ;
import { NewBoardPage } from '../newboard/newboard' ;


@Component({
  selector: 'faq-pages-group',
  templateUrl: 'faqpagesgroup.html'
 })
export class FAQPagesGroup {

    currentView: string = 'faq';
    board: any;

    @ViewChild('faqPage') faqPage: FAQPage;
    @ViewChild('newBoardPage') newBoardPage: NewBoardPage

    constructor(private credService: CredService, private navCtrl: NavController) {
    }

    public showFAQ() {
        this.faqPage.init();
        this.currentView = 'faq';
    }

    public showDetail(board) {
        this.newBoardPage.setBoard(board);
        this.currentView = 'newboard';
    }


    public showNewBoard() {
        this.newBoardPage.setBoard(null);
        this.currentView = 'newboard';
    }

    public init(){
        this.faqPage.init();
    }
 }