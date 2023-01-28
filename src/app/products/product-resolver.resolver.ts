import { map, catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductResolved } from './product';
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
export class ProductResolver implements Resolve<ProductResolved> {
    constructor(private productSer: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        let id = route.paramMap.get('id');
        if (id) {
            return this.productSer.getProduct(+id).pipe(
                map(product => {
                    return { product };
                }),
                catchError( error => { 
                    return of({product: null, error: `Error oocured while fetching the product Data ${error}`}) 
                }) 
            )
        } else {
            return of({ product: null, error: 'Id path Parameter is not valid' });
        }
    }
}
