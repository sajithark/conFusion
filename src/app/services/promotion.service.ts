import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPRequestService } from '../services/process-httprequest.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHttpMessage : ProcessHTTPRequestService) { }

  getPromotions() : Observable<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // });

    // return of(PROMOTIONS).pipe(delay(2000));

    return this.http.get<Promotion[]>(baseURL+'promotions').pipe(catchError(this.processHttpMessage.handle));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    // });

    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));

    return this.http.get<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.processHttpMessage.handle));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    // });

    // return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));

    return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(promotion => promotion[0])).pipe(catchError(this.processHttpMessage.handle));
  }
}
