import { Component } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'notification-bar',
    templateUrl: './notification-bar.component.html',
    styleUrls: ['./notification-bar.component.css']
})

export class NotificationBarComponent {
    public faCoffee = faTimesCircle;
    public showNotification = true;

    public closeNotification(): void {
        this.showNotification = false;
    }
}