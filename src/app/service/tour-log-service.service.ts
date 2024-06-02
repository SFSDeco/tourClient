import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourLog } from '../model/tour-log';
import { LogRequestWrapper } from '../model/log-request-wrapper';

@Injectable()
export class TourLogService {

  private tourLogUrl: string;

  constructor(private http: HttpClient) {
    this.tourLogUrl = 'http://localhost:8080/tour_log';
  }

  public findAll(): Observable<TourLog[]> {
    return this.http.get<TourLog[]>(this.tourLogUrl);
  }

  public findByTour(tourId: string) : Observable<TourLog[]>{
    const findByTourUrl : string = this.tourLogUrl + "/" + tourId;
    return this.http.get<TourLog[]>(findByTourUrl);
  }

  public save(tourLogWrapper: LogRequestWrapper) {
    return this.http.post<TourLog>(this.tourLogUrl, tourLogWrapper);
  }
  
  public updateTourLog(tourId: string, logId: string, tourLog: TourLog): Observable<void> {
    const updateUrl: string = `${this.tourLogUrl}/${tourId}/${logId}`;
    return this.http.put<void>(updateUrl, tourLog);
  }

  public deleteTourLog(logId: string): Observable<void> {
    const deleteUrl: string = `${this.tourLogUrl}/${logId}`;
    return this.http.delete<void>(deleteUrl);
  }
}