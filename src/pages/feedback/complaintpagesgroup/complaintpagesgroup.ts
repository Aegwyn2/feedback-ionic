import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { ComplaintPage } from '../complaint/complaint' ;
import { NewBoardPage } from '../newboard/newboard' ;
import { FillComplaintPage } from '../fillcomplaint/fillcomplaint' ;
import { FillCustomerPage } from '../fillcustomer/fillcustomer' ;

@Component({
  selector: 'complaint-pages-group',
  templateUrl: 'complaintpagesgroup.html'
 })
export class ComplaintPagesGroup {

    editMode: boolean = false;
    currentView: string = 'complaint';
    board: any;

    @ViewChild('complaintPage') complaintPage: ComplaintPage;
    @ViewChild('newBoardPage') newBoardPage: NewBoardPage;
    @ViewChild('fillComplaintPage') fillComplaintPage: FillComplaintPage
    @ViewChild('fillCustomerPage') fillCustomerPage: FillCustomerPage

constructor(private credService: CredService, private navCtrl: NavController) {
    }
    public onBoardEvent(board) {
        if(this.editMode)
            this.showDetail(board);
        else
            this.toFillComplaint(board);
    }

    public showComplaint() {
        this.complaintPage.init();
        this.currentView = 'complaint';
    }

    public showDetail(board) {
        this.newBoardPage.setBoard(board);
        this.currentView = 'newboard';
    }
    
    public toFillComplaint(board) {
        this.fillComplaintPage.setBoard(board);
        this.currentView = 'fillcomplaint'; 
    }

    public showNewBoard() {
        this.newBoardPage.setBoard(null);
        this.currentView = 'newboard';
    }
    
    public setCustomer(cust) {
    console.log("SET CUST CALLED");
        this.fillComplaintPage.customer = cust;
        this.currentView = 'fillcomplaint';
    }

    public init(){
        this.complaintPage.init();
    }
 }