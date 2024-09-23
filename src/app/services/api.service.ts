import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Board } from '../models/board';
import { BoardData } from '../models/board-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // api path
  private jsonUrl: string = './assets/data.json'

  constructor(private http: HttpClient) { }

  // get data from api
  getData(): Observable<BoardData> {
    return this.http.get<BoardData>(this.jsonUrl)
    .pipe(
      retry(2),
      catchError(err => {
        return throwError(() => new Error('Failed to fetch data', err))
      })
    );
  }
}
