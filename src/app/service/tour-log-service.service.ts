import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourLog } from '../model/tour-log';

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

  public save(tour_log: TourLog) {
    return this.http.post<TourLog>(this.tourLogUrl, tour_log);
  }
}