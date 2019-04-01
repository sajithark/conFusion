import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPRequestService } from '../services/process-httprequest.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHttpMessage : ProcessHTTPRequestService) { }

  getLeaders() : Observable<Leader[]> {
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS), 2000);
    // });

    // return of(LEADERS).pipe(delay(2000));

    return this.http.get<Leader[]>(baseURL+'leaders').pipe(catchError(this.processHttpMessage.handle));
  }

  getFeaturedLeader() : Observable<Leader> {
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // });

    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));

    return this.http.get<Leader>(baseURL+'leaders?featured=true').pipe(map(leader => leader[0])).pipe(catchError(this.processHttpMessage.handle));
  }
}
