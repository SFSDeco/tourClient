import { Tour } from "./tour";

export class TourLog {
    id !: string;
    comment !: string;
    tour !: Tour;
    difficulty !: string;
    rating !: number;
    log_date !: string;
}
