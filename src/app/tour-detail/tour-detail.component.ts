import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from '../model/tour';
import { TourService } from '../service/tour-service.service'; // Import your tour service

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  tour!: Tour;
  originalTour !: Tour;
  isLoading: boolean = true;
  isEditing: boolean = false;
  mapImageUrl !: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService // Inject the tour service
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['tour']) {
      this.tour = navigation.extras.state['tour'];
      this.isLoading = false;
      this.fetchMapImage();
    } else {
      const tourId = this.route.snapshot.paramMap.get('tourId');
      if (tourId) {
        // Fetch the tour details from the service
        this.tourService.findById(tourId).subscribe(data => {
          this.tour = data;
          this.originalTour = {...data};
          this.isLoading = false;
          this.fetchMapImage();
        }, error => {
          console.error('Error fetching tour details:', error);
          this.isLoading = false;
        });
      } else {
        console.error('No tour ID found in route parameters or state.');
        this.isLoading = false;
      }
    }
  }

  fetchMapImage() {
    this.tourService.getTourMapImage(this.tour.id).subscribe(
      data => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.mapImageUrl = e.target.result;
        };
        reader.readAsDataURL(data);
      },
      error => {
        console.error('Error fetching map image:', error);
      }
    );
  }

  editTour() {
    this.isEditing = true;
  }

  deleteTour(){
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tourService.delete(this.tour.id).subscribe(
        () => {
          console.log('Tour deleted successfully');
          // Navigate back to the tour list
          this.router.navigate(['/tours']);
        },
        error => {
          console.error('Error deleting tour:', error);
        }
      );}
  }

  cancelEdit() {
    this.isEditing = false;
    this.tour = { ...this.originalTour };
  }

  saveTour() {
    this.tourService.updateTour(this.tour).subscribe(() => {
      this.isEditing = false;
      this.originalTour = this.tour;
    }, error => {
      console.error('Error saving tour:', error);
    });
  }

  viewTourLogs() {
    this.router.navigate(['/tour-logs', this.tour.id]);
  }
}
