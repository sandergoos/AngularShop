import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { flyInOut } from '../../animations';

@Component({
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
    selector: 'notifications',
    animations: [
        flyInOut
    ]
})

export class NotificationComponent implements OnInit {
    constructor(private eventService: EventService) { }

    locked: boolean = false;

    loading: boolean = false;
    loadingMessage: string;

    successMessage: string = "";
    successMessages: string[];

    ngOnInit(): void {
        this.eventService.on("loading", this.showLoading.bind(this));
        this.eventService.on("stopLoading", this.stopLoading.bind(this));
        this.eventService.on('showSuccess', this.showSuccess.bind(this));
    }

    showLoading(message: any): void {
        if (typeof message != "string") return;
        this.loading = true;
        this.loadingMessage = message;
    }

    stopLoading(): void {
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    showSuccess(message: string) {
        if (typeof message != "string") return;
        this.successMessage = message;

        var timeout = setTimeout(() => {
            this.successMessage = "";
        }, 2500);
    }
}