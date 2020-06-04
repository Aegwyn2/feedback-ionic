import { Injectable }		from '@angular/core';
import { Observable } 		from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { CredService } from './credservice' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {

    public tenantId: string;
    public userName: string;
    public sessionString: string;

    constructor(private http: Http, private credService: CredService) {}
    
    public getBoards(type: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;
       
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/boardlist/';
        
        if(type == 'faq')
            url += 'faq';
        else if(type == 'complaint')
            url += 'complaint';
        else if(type == 'suggestion')
            url += 'suggestion';


        return this.http.get(url, requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public getFAQS() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;
       
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/faqboardlist';

        return this.http.get(url, requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public getComplaintBoards() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        let url = 'http://192.168.1.13:8080/CFFeedback/resource/boardlist/complaint';

        return this.http.get(url, requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public addBoard(type: string, boardName: string, boardContent: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "name": boardName, "content": boardContent});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/newboard/';
        if(type == 'faq')
            url += 'faq';
        else if(type == 'complaint')
            url += 'complaint';
        else if(type == 'suggestion')
            url += 'suggestion';
            
            console.log("URL: " + url)
            
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public addFAQBoard(boardName: string, boardContent: string) {
        console.log("addNewFAQBoard is called")
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "name": boardName, "content": boardContent});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/newfaqboard';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public addComplaintBoard(boardName: string, boardContent: string) {
        console.log("addComplaintBoard is called")
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "name": boardName, "content": boardContent});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/newcomplaintboard';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public editBoard(type: string, systemId: number, boardName: string, boardContent: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "systemId": systemId, "name": boardName, "content": boardContent});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/editboard/';
        if(type == 'faq')
            url += 'faq';
        else if(type == 'complaint')
            url += 'complaint';
        else if(type == 'suggestion')
            url += 'suggestion';
            
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public editFAQBoard(systemId: number, boardName: string, boardContent: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "systemId": systemId, "name": boardName, "content": boardContent});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/editfaqboard';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public deleteBoard(type: string, systemId: number) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "systemId": systemId});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/deleteboard/';
        if(type == 'faq')
            url += 'faq';
        else if(type == 'complaint')
            url += 'complaint';
        else if(type == 'suggestion')
            url += 'suggestion';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }


    public deleteFAQBoard(systemId: number) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify({"sessionString": this.credService.sessionString, "systemId": systemId});
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/deletefaqboard';
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
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
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    public addComplaint(complaint: any) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify(
                                {"sessionString": this.credService.sessionString,
                                 "feedbackContent": complaint.feedbackContent,
                                 "feedbackCall": complaint.feedbackCall,
                                 "urgentCall": complaint.urgentCall,
                                 "idBoard": complaint.idBoard,
                                 "fullName": complaint.customer.fullName,
                                 "gender": complaint.customer.gender,
                                 "addrPhone": complaint.customer.addrPhone,
                                 "addrNation": complaint.customer.addrNation,
                                 "addrCity": complaint.customer.addrCity,
                                 "age": complaint.customer.age
                                }
                         );
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/newcomplaint';
            
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public addSuggestion(suggestion: any) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let opt = new RequestOptions({headers: headers});
        let jsonString = JSON.stringify(
                                {"sessionString": this.credService.sessionString,
                                 "feedbackContent": suggestion.feedbackContent,
                                 "idBoard": suggestion.idBoard,
                                 "fullName": suggestion.customer.fullName,
                                 "gender": suggestion.customer.gender,
                                 "addrPhone": suggestion.customer.addrPhone,
                                 "addrNation": suggestion.customer.addrNation,
                                 "addrCity": suggestion.customer.addrCity,
                                 "age": suggestion.customer.age
                                }
                         );
        let url = 'http://192.168.1.13:8080/CFFeedback/resource/newsuggestion';
            
        return this.http.post(url, jsonString, opt)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
}