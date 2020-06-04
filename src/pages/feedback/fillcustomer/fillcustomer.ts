import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'fillcustomer-page',
  templateUrl: 'fillcustomer.html'
 })
export class FillCustomerPage {
    name: string;
    noHp: string;
    gender: number = 0;
    country: string = "Amerika";
    city: string = "Bandung";
    age: number;
    
    @Input()
    radioName: string;
        
    @Output()
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onOkay: EventEmitter<any> = new EventEmitter<any>();
                        
    public cancel() {
        this.onCancel.emit();
    }
        
    public save() {
        let obj = {
                    "fullName": this.name,
                    "gender": this.gender,
                    "addrPhone": this.noHp,
                    "addrNation": this.country,
                    "addrCity": this.city,
                    "age": this.age
                  };
        
        this.onOkay.emit(obj);
    }
        
    fillCustomer() {
        this.onCancel.emit();
    }
}