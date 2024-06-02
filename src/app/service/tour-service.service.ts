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

  public findById(tourId : string): Observable<Tour> {
    const url = `${this.tourUrl}/${tourId}`;
    return this.http.get<Tour>(url);
  }

  public getTourMapImage(tourId: string): Observable<Blob> {
    const url = `${this.tourUrl}/map/${tourId}`; // Assuming your endpoint is /map/{tourId}
    return this.http.get(url, { responseType: 'blob' });
  }

  public save(tour: Tour) {
    return this.http.post<Tour>(this.tourUrl, tour);
  }

  public updateTour(tour: Tour){
    const url = `${this.tourUrl}/${tour.id}`;
    return this.http.put<Tour>(url, tour);
  }

  public delete(tourId: string) {
    const url = `${this.tourUrl}/${tourId}`
    return this.http.delete(url);
  }

}