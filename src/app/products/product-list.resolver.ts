import { map, catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductListResolved } from './product';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductListResolver implements Resolve<ProductListResolved> {

    constructor(private productSer: ProductService){}

    resolve(): Observable<ProductListResolved> {
        return this.productSer.getProducts().pipe(
            map(products => ({products, error: ''}) ),
            catchError( err => {
                return of( {products: null, error: err});
            })
        )
    }
}
