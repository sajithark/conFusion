import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPRequestService } from '../services/process-httprequest.service';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
              private processHttpMessage : ProcessHTTPRequestService) { }
  
  submitFeedback(feedback : Feedback) : Observable<Feedback> {
    const httpOptions = {
      headers : new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+'feedback', feedback, httpOptions)
    .pipe(catchError(this.processHttpMessage.handle));
  }
}
