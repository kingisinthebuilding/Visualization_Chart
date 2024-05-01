import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private getRequest<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getIntensity(): Observable<any> {
    return this.getRequest('intensity');
  }

  getRelevance(): Observable<any> {
    return this.getRequest('relevance');
  }

  getLikelihood(): Observable<any> {
    return this.getRequest('likehood');
  }

  getYear(): Observable<any> {
    return this.getRequest('year');
  }

  getCountry(): Observable<any> {
    return this.getRequest('country');
  }

  getTopic(): Observable<any> {
    return this.getRequest('topic');
  }

  getRegion(): Observable<any> {
    return this.getRequest('region');
  }

  getCity(): Observable<any> {
    return this.getRequest('city');
  }

}
