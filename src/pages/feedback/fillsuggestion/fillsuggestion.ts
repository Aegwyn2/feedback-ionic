import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackService } from '../../../services/feedbackservice' ;
import { UtilService } from '../../../services/utilservice' ;
import 'rxjs/add/operator/finally';

@Component({
  selector: 'fillsuggestion-page',
  templateUrl: 'fillsuggestion.html'
 })
export class FillSuggestionPage {
  
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
        var suggestion: any = {};
        suggestion.feedbackContent = this.feedbackContent;
        suggestion.idBoard = this.board.systemId;
        suggestion.customer = this.customer;
        console.log('OBJ: ' + JSON.stringify(suggestion, undefined, 4));
        let obs = this.feedbackService.addSuggestion(suggestion);
        this.utilService.load('Sending new suggestion...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData('Suggestion was sent successfully', () => {this.onOkay.emit();}),
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
                    },
                    error => {
                        alert("ERROR: " + error);
                    }
                );*/
        });
    }
        
    fillCustomer() {
        this.onFillCustomer.emit();
    }
}