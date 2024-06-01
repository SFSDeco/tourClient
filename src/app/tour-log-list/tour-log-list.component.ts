import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourLog } from '../model/tour-log';
import { TourLogService } from '../service/tour-log-service.service';

@Component({
  selector: 'app-tour-log-list',
  templateUrl: './tour-log-list.component.html',
  styleUrls: ['./tour-log-list.component.css']
})
export class TourLogListComponent implements OnInit {

  tourId !: string;
  tour_logs !: TourLog[];

  constructor(private tourLogService: TourLogService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tourId = String(params['tourId']);
    })

    this.tourLogService.findByTour(this.tourId).subscribe(data => {
      this.tour_logs = data;
    })

  }
}
