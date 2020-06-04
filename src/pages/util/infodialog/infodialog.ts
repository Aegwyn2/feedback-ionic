import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'infodialog',
  templateUrl: 'infodialog.html'
})
export class InfoDialog {
  
  title: string = "";
  message: string = "";
  
  constructor(public navParams: NavParams, public viewCtrl: ViewController) 
  {
    this.title = navParams.get('title');
    this.message = navParams.get('message');
  }
  
  public dismiss() {
        this.viewCtrl.dismiss();
  }

  // ...
}
