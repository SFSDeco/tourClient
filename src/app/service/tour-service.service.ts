import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tour } from '../model/tour';
import { Observable } from 'rxjs';

@Injectable()
export class TourService {

  private tourUrl: string;

  constructor(private http: HttpClient) {
    this.tourUrl = 'http://localhost:8080/tour';
  }

  public findAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tourUrl);
  }

  public save(tour: Tour) {
    return this.http.post<Tour>(this.tourUrl, tour);
  }
}