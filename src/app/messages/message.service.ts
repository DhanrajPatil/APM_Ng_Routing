import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private _messages: string[] = [];

    constructor(private router: Router) { }

    get isMessagesDisplayed(): boolean {
        let currentPath = this.router.url;
        return currentPath.includes('popup:messages');
    }

    get messages(): string[] {
        return this._messages;
    }

    addMessage(message: string): void {
        const currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    }
}
