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
    locked: boolean = false;
    notifications: INotification[] = [];

    constructor(private eventService: EventService) { }

    ngOnInit(): void {
        this.eventService.on("loading", this.showLoading.bind(this));
        this.eventService.on("stopLoading", this.stopLoading.bind(this));
        this.eventService.on('showSuccess', this.showSuccess.bind(this));
        this.eventService.on('showError', this.showError.bind(this));
    }

    stopLoading(): void {
        setTimeout(() => {
            this.removeTypeMessage('loading');
        }, 500);
    }

    removeTypeMessage(type: string) {
        var i = this.notifications.length;
        while (i--) {
            if (this.notifications[i].type === type) {
                this.notifications.splice(i, 1);
            }
        }
    }

    removeIdentifierMessage(identifier: number) {
        var i = this.notifications.length;
        while (i--) {
            if (this.notifications[i].identifier === identifier) {
                this.notifications.splice(i, 1);
            }
        }
    }

    showLoading(message: any): void {
        if (typeof message != "string") return;

        this.notifications.push({
            text: message,
            type: 'loading',
            identifier: 0
        });
    }

    showSuccess(message: string) {
        if (typeof message != "string") return;

        var identifier = this.randomNumber();

        this.notifications.push({
            text: message,
            type: 'success',
            identifier: identifier
        });

        setTimeout(() => {
            this.removeIdentifierMessage(identifier);
        }, 2500);
    }

    showError(message: string): void {
        var identifier = this.randomNumber();

        this.notifications.push({
            text: message,
            type: 'error',
            identifier: identifier
        });

        setTimeout(() => {
            this.removeIdentifierMessage(identifier);
        }, 3000);
    }

    randomNumber(): number {
        return Math.floor((Math.random() * 100000) + 1);
    }
}

export interface INotification {
    type: string;
    text: string;
    identifier: number;
}