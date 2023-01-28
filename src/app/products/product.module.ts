import { AuthGuard } from './../user/auth.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductResolver } from './product-resolver.resolver';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { ProductListResolver } from './product-list.resolver';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { 
                path: '',
                component: ProductListComponent,
                resolve: { productsResponse: ProductListResolver }
            },
            { 
                path: ':id',
                component: ProductDetailComponent,
                resolve: { resolvedProduct: ProductResolver }
            },
            { 
                path: ':id/edit',
                component: ProductEditComponent,
                canDeactivate: [ProductEditGuard],
                resolve: { resolvedProduct: ProductResolver },
                children: [
                    {
                        path: '',
                        redirectTo: 'info',
                        pathMatch: 'full'
                    },
                    {
                        path: 'info',
                        component: ProductEditInfoComponent
                    },
                    {
                        path: 'tags',
                        component: ProductEditTagsComponent
                    }
                ]
            }
        ])
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductEditInfoComponent,
        ProductEditTagsComponent
    ]
})
export class ProductModule { }
