import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product, ProductListResolved } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';

    _listFilter: string | null = '';
    get listFilter(): string {
        return this._listFilter ? this._listFilter : '';
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: Product[] = [];
    products: Product[] = [];

    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this._listFilter = this.route.snapshot.queryParamMap.get('listFilter');
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
        const productsResponse = this.route.snapshot.data['productsResponse'];
        if(productsResponse.products) {
            this.products = productsResponse.products;
            this.filteredProducts = this.performFilter(this.listFilter);
        } else {
            this.products = [];
            this.filteredProducts = [];
        }
    }

    performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
