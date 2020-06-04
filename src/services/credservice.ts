import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CredService {

    public tenantId: string;
    public companyName: string;
    public email: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public sessionString: string;

    constructor(private http: Http) {}

    public loginCompany(companyName: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('companyName', companyName);
        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        let url = 'http://192.168.1.13:8080/CFLogin/resource/tenantinfo';
        return this.http.get(url, requestOptions)
                        .map(
                            res => {
                                    let obj = this.extractData(res);
                                    this.tenantId = obj.tenantId; 
                                    this.companyName = obj.companyName;
                                    return obj;
                            })
                        .catch(this.handleError);
    }

    public login(email: String, password: String) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"tenantId": this.tenantId, "email": email, "pwd": password});
        let url = 'http://192.168.1.13:8080/CFLogin/resource/login';
        return this.http.post(url, jsonString, opt)
                        .map(
                            res => {
                                    let obj = this.extractData(res);
                                    this.userName = obj.userName; 
                                    this.sessionString = obj.sessionString;
                                    return obj;
                            })
                         .catch(this.handleError);
    }
    
    public logout() {
        if(!this.sessionString)
            return;

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.sessionString});
        let url = 'http://192.168.1.13:8080/CFLogin/resource/logout';
        this.clear();
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public getFAQS() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.sessionString);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        let url = 'http://192.168.1.13:8080/CFFeedback/resource/faqboardlist';

        return this.http.get(url, requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public inviteUsers(emails: string[]) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.sessionString, "emails": emails});
        let url = 'http://192.168.1.13:8080/CFLogin/resource/inviteusers';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public register(companyName: String, firstName: String, lastName: String, userName: String, password: String) {
        console.log("IN SER, EMAIL: " + this.email);

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"companyName": companyName,
                                         "email": this.email, 
                                         "firstName": firstName,
                                         "lastName": lastName,
                                         "userName": userName,
                                         "pwd": password
                                       });
        let url = 'http://192.168.1.13:8080/CFLogin/resource/register';
        return this.http.post(url, jsonString, opt)
                        .map(
                            res => {
                                    let obj = this.extractData(res);
                                    this.tenantId = obj.tenantId;
                                    this.userName = obj.userName;
                                    this.firstName = obj.firstName;
                                    this.lastName = obj.lastName; 
                                    this.sessionString = obj.sessionString;
                                    return obj;
                            }
                        )
                        .catch(this.handleError);
    }

    public createProfile(firstName: String, lastName: String, userName: String, password: String) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"tenantId": this.tenantId,
                                         "email": this.email, 
                                         "firstName": firstName,
                                         "lastName": lastName,
                                         "userName": userName,
                                         "pwd": password
                                       });
        let url = 'http://192.168.1.13:8080/CFLogin/resource/createprofile';
        return this.http.post(url, jsonString, opt)
                        .map(
                            res => {
                                    let obj = this.extractData(res);
                                    this.userName = obj.userName;
                                    this.firstName = obj.firstName;
                                    this.lastName = obj.lastName; 
                                    this.sessionString = obj.sessionString;
                                    return obj;
                            }
                        )
                        .catch(this.handleError);
    }

    public getGroupList() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', this.email);
        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        let url = 'http://192.168.1.13:8080/CFLogin/resource/joingrouplist';
        return this.http.get(url, requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public clear() {
        this.tenantId = null;
        this.companyName = null;
        this.email = null;
        this.userName = null;
        this.firstName = null;
        this.lastName = null;
        this.sessionString = null;
    }


    private extractData(res: Response) {
        let retval = null ;
        if(res)
                retval = res.json();
         return retval;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}