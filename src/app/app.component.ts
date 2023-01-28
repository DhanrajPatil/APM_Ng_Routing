import { MessageService } from './messages/message.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pageTitle = 'Acme Product Management';

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }
    
    get isMessagesDisplayed(): boolean {
        return this.ms.isMessagesDisplayed;
    }

    get userName(): string {
        if (this.authService.currentUser) {
            return this.authService.currentUser.userName;
        }
        return '';
    }

    constructor(private authService: AuthService,
        private ms: MessageService,
        private router: Router) { }

    logOut(): void {
        this.authService.logout();
        console.log('Log out');
        this.router.navigateByUrl('welcome');
    }

    toggleMessages() {
        if(this.isMessagesDisplayed) {
            this.router.navigate([ { outlets: {popup: null}}]);
        } else {
            this.router.navigate([ { outlets: {popup: 'messages'}}]);
        }
    }
}
