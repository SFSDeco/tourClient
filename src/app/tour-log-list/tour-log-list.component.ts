import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogRequestWrapper } from '../model/log-request-wrapper';
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
  editLog!: TourLog;
  showAddLogForm : boolean = false;
  newLog: TourLog = {
    id: '',
    comment: '',
    tour: {
      id: '',
      name: '',
      fromAddress: '',
      toAddress: '',
      transportation_type: ''
    },
    difficulty: '',
    rating: 0,
    log_date: ''
  };

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

  addTourLog() {
    this.showAddLogForm = true;
  }

  saveNewTourLog() {
    if (this.newLog.comment && this.newLog.difficulty && this.newLog.log_date && this.newLog.rating) {
      // All fields are filled, proceed to save
      const logRequest: LogRequestWrapper = {
        tourLog : this.newLog,
        tourId : this.tourId
      }

      this.tourLogService.save(logRequest).subscribe(
        () => {
          // Success
          console.log('Tour log saved successfully');
          // Refresh tour logs
          this.loadTourLogs();
          // Hide form
          this.showAddLogForm = false;
          // Reset new log
          this.resetNewLog();
        },
        error => {
          console.error('Error saving tour log:', error);
        }
      );
    } else {
      // Not all fields are filled, display error message
      alert('All fields are mandatory to fill');
    }
  }

  cancelAddTourLog() {
    // Reset form and hide it
    this.resetNewLog();
    this.showAddLogForm = false;
  }

  resetNewLog() {
    this.newLog = {
      id: '',
      comment: '',
      tour: this.tour,
      difficulty: '',
      rating: 0,
      log_date: ''
    };
  }

  public loadTourLogs() {
    // Reload tour logs
    this.tourLogService.findByTour(this.tourId).subscribe(data => {
      this.tour_logs = data;
    });
  }

  isEditing(log: TourLog): boolean {
    return this.editLog && this.editLog.id === log.id;
  }

  editTourLog(log: TourLog) {
    this.editLog = { ...log };
  }

  cancelEditTourLog() {
    this.editLog = {} as TourLog;
  }

  saveEditTourLog(logId: string) {
    if (this.editLog) {
      // Update the tour log on the backend
      this.tourLogService.updateTourLog(this.tourId, logId, this.editLog).subscribe(
        () => {
          // Success
          console.log('Tour log updated successfully');
          this.loadTourLogs();
          // Exit editing mode
          this.editLog = {} as TourLog;
        },
        error => {
          console.error('Error updating tour log:', error);
        }
      );
    }
  }

  deleteTourLog(logId: string) {
    this.tourLogService.deleteTourLog(logId).subscribe(() => {
      this.tour_logs = this.tour_logs.filter(log => log.id !== logId);
    });
  }
}
