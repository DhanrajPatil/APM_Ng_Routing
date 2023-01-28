import { ProductResolved } from './../product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
    templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm?: NgForm;

    errorMessage = '';
    product: Product | undefined;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent?.data.subscribe(
            (data) => {
                const resolvedProduct: ProductResolved = data['resolvedProduct'];
                if(resolvedProduct && resolvedProduct.product) {
                    this.product = resolvedProduct.product;
                } else if(resolvedProduct.error){
                    this.errorMessage = resolvedProduct.error;
                }
            }
        )

    }
}
