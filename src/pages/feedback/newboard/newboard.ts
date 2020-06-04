import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { UtilService } from '../../../services/utilservice' ;
import { FeedbackService } from '../../../services/feedbackservice' ;
import { InfoDialog } from '../../util/infodialog/infodialog' ;
import 'rxjs/add/operator/finally';

@Component({
  selector: 'newboard-page',
  templateUrl: 'newboard.html'
 })
export class NewBoardPage {
	
    public board: any;
    public boardName: string;
    public boardContent: string;
    public mode: string = 'new';

    @Input()
    boardType: string ;

    @Output()
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onOkay: EventEmitter<any> = new EventEmitter<any>();

    constructor(private credService: CredService, private feedbackService: FeedbackService, private utilService: UtilService, 
        private modalCtrl: ModalController, private navCtrl: NavController) {
    }

    public setBoard(board) {
        this.board = board;
        if(board) {
            this.boardName = board.name;
            this.boardContent = board.content;
            this.mode = 'edit';
        }
        else {
            this.boardName = "";
            this.boardContent = "";
            this.mode = "new";
        }
    }

    public save() {
        console.log("BOARD TYPE: " + this.boardType);
        if(this.mode == 'new')
            this.addNewBoard();
        else if(this.mode == 'edit' )
            this.edit();
    }

    public edit() {
        let obs = this.feedbackService.editBoard(this.boardType, this.board.systemId, this.boardName, this.boardContent);
        this.utilService.load('Editing current board...', () => {
            obs.finally(() => this.utilService.dismiss())
               .subscribe (
                    this.utilService.handleIncomingData('Board was edited successfully', () => {this.onOkay.emit();}),
                    this.utilService.handleIncomingError(null)
                );
        });
    }

    public delete() {
        let obs = this.feedbackService.deleteBoard(this.boardType, this.board.systemId);
        this.utilService.load('Deleting current board...', () => {
            obs.subscribe (
                    this.utilService.handleIncomingData('Board was deleted successfully', () => {this.onOkay.emit();}),
                    this.utilService.handleIncomingError(null)
                );
        });
    }

    public cancel() {
        this.onCancel.emit();
    }

    public addNewBoard() {
        let obs = this.feedbackService.addBoard(this.boardType, this.boardName, this.boardContent);
        this.utilService.load('Adding new board...', () => {
            obs.finally(() => this.utilService.dismiss())
               .subscribe (
                    this.utilService.handleIncomingData('New board was added successfully', () => {this.onOkay.emit();}),
                    this.utilService.handleIncomingError(null)
                );
        });
    }

    public init(){

    }  	
 }