import { SelectiveModuleStrategyService } from './selective-module-strategy.service';
import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { PreloadAllModules, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                data: {preload: false},
                canActivate: [AuthGuard],
                loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
            },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: '/welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], 
        { 
            useHash: true, 
            preloadingStrategy: SelectiveModuleStrategyService 
        }),
        UserModule,
        MessageModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
