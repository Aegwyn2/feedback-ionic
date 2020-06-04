import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { SuggestionPage } from '../suggestion/suggestion' ;
import { NewBoardPage } from '../newboard/newboard' ;
import { FillSuggestionPage } from '../fillsuggestion/fillsuggestion' ;
import { FillCustomerPage } from '../fillcustomer/fillcustomer' ;


@Component({
  selector: 'suggestion-pages-group',
  templateUrl: 'suggestionpagesgroup.html'
 })
export class SuggestionPagesGroup {
    editMode: boolean = false;
    currentView: string = 'suggestion';
    board: any;

    @ViewChild('suggestionPage') suggestionPage: SuggestionPage;
    @ViewChild('newBoardPage') newBoardPage: NewBoardPage;
    @ViewChild('fillSuggestionPage') fillSuggestionPage: FillSuggestionPage;
    @ViewChild('fillCustomerPage') fillCustomerPage: FillCustomerPage;

    constructor(private credService: CredService, private navCtrl: NavController) {
    }
    
    public onBoardEvent(board) {
        if(this.editMode)
            this.showDetail(board);
        else
            this.toFillSuggestion(board);
    }

    public showSuggestion() {
        this.suggestionPage.init();
        this.currentView = 'suggestion';
    }

    public showDetail(board) {
        this.newBoardPage.setBoard(board);
        this.currentView = 'newboard';
    }

    public showNewBoard() {
        this.newBoardPage.setBoard(null);
        this.currentView = 'newboard';
    }
    
    public toFillSuggestion(board) {
        this.fillSuggestionPage.setBoard(board);
        this.currentView = 'fillsuggestion'; 
    }

    public init(){
        this.suggestionPage.init();
    }
    
    public setCustomer(cust) {
    console.log("SET CUST CALLED IN SUGGESTION");
        this.fillSuggestionPage.customer = cust;
        this.currentView = 'fillsuggestion';
    }
 }