import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CredService } from '../../../services/credservice' ;
import { UtilService } from '../../../services/utilservice' ;
import { FeedbackService } from '../../../services/feedbackservice' ;
import { InfoDialog } from '../../util/infodialog/infodialog' ;


@Component({
  selector: 'faq-page',
  templateUrl: 'faq.html'
 })
export class FAQPage {
    userName: String;
    listBoards: any = null;
    isLoading: boolean = true;

    @Output()
    onNewBoard: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onBoard: EventEmitter<any> = new EventEmitter<any>();

    constructor(private credService: CredService, private feedbackService: FeedbackService, private utilService: UtilService, 
        private modalCtrl: ModalController, private navCtrl: NavController) {
    }

    public init(){
        let obs = this.feedbackService.getBoards('faq');
        
        this.isLoading = true;
        this.userName = this.credService.userName;
        
        setTimeout(() => {
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                            console.log("ERROR RESPONSE: " + data.errorMessage);
                            return;
                    }
                    this.listBoards = this.returnBoards(data.listBoards);
                    this.isLoading = false;
                },
                error => {
                    console.log("ERROR: " + error);
                    this.isLoading = false;
                }
            );
        }, 2000);
    }

    public onBoardClicked(board) {
        this.onBoard.emit(board);
    }

    public newBoardClicked() {
        this.onNewBoard.emit();
    }

    private returnBoards(allBoards) {
        var listBoards = []; 
        var index = 0;
        while(index < allBoards.length) {
                var boards = [];
                var board = allBoards[index];
                boards.push(board);
                index++;

                if(index < allBoards.length) {
                        board = allBoards[index];
                        boards.push(board);
                        index++;
                }
                else {
                        boards.push(null);
                }
                listBoards.push(boards);
        }
        return listBoards;
    }
 }