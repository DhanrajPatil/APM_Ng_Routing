import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    pageTitle = 'Product Detail';
    product: Product | null = null;
    errorMessage = '';

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit(): void {
        // const id = this.route.snapshot.paramMap.get('id');
        // if(id) {
        //     this.getProduct(+id);
        // }

        const resolvedProduct: ProductResolved = this.route.snapshot.data['resolvedProduct'];
        if(resolvedProduct.product) {
            this.onProductRetrieved(resolvedProduct.product);
        } else if(resolvedProduct.error){
            this.errorMessage = resolvedProduct.error;
        }
    }

    getProduct(id: number): void {
        this.productService.getProduct(id).subscribe({
            next: product => this.onProductRetrieved(product),
            error: err => this.errorMessage = err
        });
    }

    onProductRetrieved(product: Product): void {
        this.product = product;
        if (this.product) {
            this.pageTitle = `Product Detail: ${this.product.productName}`;
        } else {
            this.pageTitle = 'No product found';
        }
    }

    goBack() {
        this.router.navigate(['products'], {queryParamsHandling: "preserve"});
    }
}
