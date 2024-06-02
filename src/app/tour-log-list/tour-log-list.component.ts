import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from '../model/tour';
import { TourLog } from '../model/tour-log';
import { TourLogService } from '../service/tour-log-service.service';
import { TourService } from '../service/tour-service.service';

@Component({
  selector: 'app-tour-log-list',
  templateUrl: './tour-log-list.component.html',
  styleUrls: ['./tour-log-list.component.css']
})
export class TourLogListComponent implements OnInit {

  tourId !: string;
  tour !: Tour;
  tour_logs !: TourLog[];

  constructor(private tourLogService: TourLogService,
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tourId = String(params['tourId']);
    });

    this.tourService.findById(this.tourId).subscribe(
      data => {
        this.tour = data;
      },
      error => {
        console.error('Error fetching tour details:', error);
      });

    this.tourLogService.findByTour(this.tourId).subscribe(data => {
      this.tour_logs = data;
    });

  }

  formatDate(dateStr: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  }
}
