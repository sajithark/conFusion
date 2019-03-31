import { Injectable } from '@angular/core'; 
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPRequestService {

  constructor() { }

  public handle( error : HttpErrorResponse | any) {
    let errorMessage : string;

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage=`${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errorMessage);
  }
}
