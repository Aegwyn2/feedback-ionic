import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackService } from '../../../services/feedbackservice' ;
import { UtilService } from '../../../services/utilservice' ;
import 'rxjs/add/operator/finally';

@Component({
  selector: 'fillcomplaint-page',
  templateUrl: 'fillcomplaint.html'
 })
export class FillComplaintPage {
    feedbackCall: boolean;
    urgentCall: boolean;
    feedbackContent: string;
    
    public customer: any ;
    
    @Input()
    board: any = {systemId: null, name: "", content: ""};
    
    @Output()
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onOkay: EventEmitter<any> = new EventEmitter<any>();
        
    @Output()
    onFillCustomer: EventEmitter<any> = new EventEmitter<any>();
        
    constructor(private feedbackService: FeedbackService, private utilService: UtilService) {
    }
        
    public setBoard(board) {
        this.board = board;
    }
        
    public cancel() {
        this.onCancel.emit();
    }
        
    public save() {
        var complaint: any = {};
        complaint.feedbackCall = this.feedbackCall;
        complaint.urgentCall = this.urgentCall;
        complaint.feedbackContent = this.feedbackContent;
        complaint.idBoard = this.board.systemId;
        complaint.customer = this.customer;
        console.log('OBJ: ' + JSON.stringify(complaint, undefined, 4));
        let obs = this.feedbackService.addComplaint(complaint);
        this.utilService.load('Sending new complaint... ', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData('Complaint was sent successfully', () => {this.onOkay.emit();}),
                    this.utilService.handleIncomingError(null)
                );
        
            /*obs.finally(() => this.utilService.dismiss())
               .subscribe (
                    data => {
                        if(data.errorMessage) {
                                alert("ERROR RESPONSE:" + data.errorMessage);
                                return;
                        }
                        this.onOkay.emit();
                        this.utilService.dismiss();
                    },
                    error => {
                        alert("ERROR: " + error);
                        this.utilService.dismiss();
                    }
                );*/
        });
    }
        
    fillCustomer() {
        this.onFillCustomer.emit();
    }
}