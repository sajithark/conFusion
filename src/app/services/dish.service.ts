import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; 
// import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators'; 
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPRequestService } from '../services/process-httprequest.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHttpMessage : ProcessHTTPRequestService) { }

  getDishes() : Observable<Dish[]>{
    // return Promise.resolve(DISHES);
    //Simulate server latency with 2 seconds delay
    // return new Promise(resolve =>{
    //   setTimeout(() => resolve(DISHES), 2000)
    // });

    // return of(DISHES).pipe(delay(2000));

    return this.http.get<Dish[]>(baseURL+'dishes').pipe(catchError(this.processHttpMessage.handle));
  }

  getDish(id: string): Observable<Dish> {
    //Simulate server latency with 2 seconds delay
    // return new Promise( resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id == id))[0]), 2000)
    // });

    // return of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes/'+id).pipe(catchError(this.processHttpMessage.handle));
  }

  getFeaturedDish(): Observable<Dish> {
    // return new Promise( resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });

    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHttpMessage.handle));
  }

  getDishIds(): Observable<string | any> {
    // return of(DISHES.map(dish => dish.id));

    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
  }
}
