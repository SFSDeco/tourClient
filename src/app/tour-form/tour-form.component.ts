import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../service/tour-service.service';
import { Tour } from '../model/tour';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent {

  tour!: Tour;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private tourService: TourService) {
    this.tour = new Tour();
  }

  onSubmit() {
    this.tourService.save(this.tour).subscribe(result => this.gotoTourList());
  }

  gotoTourList() {
    this.router.navigate(['/tours']);
  }
}