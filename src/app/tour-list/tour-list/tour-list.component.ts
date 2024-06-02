import { Component, OnInit } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours!: Tour[];

  constructor(private tourService: TourService, private router: Router) {
  }

  ngOnInit() {
    this.tourService.findAll().subscribe(data => {
      this.tours = data.sort((a,b) => parseInt(a.id) - parseInt(b.id));
    });
  }

  viewTourLogs(tourId: string) {
    this.router.navigate(['/tour-logs', tourId]); // Navigate to Tour Logs list with tour ID
  }

  viewTourDetail(tour: Tour) {
    this.router.navigate(['/tour-detail', tour.id], { state: { tour } }); // Navigate to Tour Detail view with tour object
  }
}
