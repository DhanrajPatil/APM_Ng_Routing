import { ProductEditComponent } from './product-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent): Observable<boolean> | boolean  {
        let productName = component._product.productName || 'New Product';
        if(component.isFormDirty()) {
            return confirm(`Do you really want navigate away from this form?
            The updated data of ${productName} will be lost`);
        }
        return true;
    }
}
