import { Injectable }        from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { InfoDialog } from '../pages/util/infodialog/infodialog' ;

@Injectable()
export class UtilService {

    loader: any = null ;

    constructor(private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
    }
    
    public load(title: string, action: Function) {
            
        this.loader = this.loadingCtrl.create({
                           content: title,
                         });

        this.loader.present()
              .then(() => setTimeout(action,2000));
    }
    
    public showInfoDialog(title: string, message: string) {
        let modalDlg = this.modalCtrl.create(InfoDialog, {title: title, message: message});
        modalDlg.present();
    }
    
    public dismiss() {
        if(this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    }
    
    public handleIncomingData(message: string, addFunction: Function) {
        return data => {
            if(data.errorMessage) {
                this.showInfoDialog("Error", data.errorMessage);
                this.dismiss();
                return;
            }
            if(addFunction)
                addFunction();
            this.dismiss();
            if(message)
                this.showInfoDialog("Info", message);
        }
    }
    
    public handleIncomingError(addFunction: Function) {
        return error => {
            if(addFunction)
                addFunction();
                
            this.dismiss();
            this.showInfoDialog("Error", error);
        }
    }
}