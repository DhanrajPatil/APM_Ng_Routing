import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle = 'Product Edit';
    errorMessage = '';
    originalProduct!: Product;
    _product!: Product;
    isDataValid: {[key: string]: boolean} = {};

    get product(): Product {
        return this._product;
    }
    set product(val) {
        this.originalProduct = {...val};
        this._product = val;
    }

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute) { }

    isValid(path?: string): boolean {
        if(path) {     
            this.isDataValid[path] = this.isTabValid(path);
            return this.isDataValid[path]; 
        } else {
            return this.isTabValid('info') && this.isTabValid('tags');
        }
    }

    isFormDirty(): boolean {
        return JSON.stringify(this.originalProduct) !== JSON.stringify(this.product);
    }

    isTabValid(tabName: string): boolean {
        if(tabName === 'info' ) {
            if(this.product && this.product.productName && this.product.productCode) {
                return true;
            }
        } else if(tabName === 'tags'){
            if(this.product.tags && Array.isArray(this.product.tags) && this.product.tags.length >= 2) {
                return true;
            }
        }
        return false;
    }

    ngOnInit(): void {
        // below code won't work if path parameter changes only in the URL
        // ex.  products/1/edit  ->  products/0/edit 
        // for that we need to watch for change in Paramters
        /* 
            const id = this.route.snapshot.paramMap.get('id');
            if(id){
                const numberId: number = +id;
                this.getProduct(numberId);
            } 
        */
        this.route.data.subscribe (
            (data) => {
                const resolvedProduct = data['resolvedProduct'];
                if(resolvedProduct.product) {
                    this.onProductRetrieved(resolvedProduct.product);
                } else {
                    this.errorMessage = resolvedProduct.error;
                }
            }
        )
    }

    onProductRetrieved(product: Product): void {
        this.product = product;

        if (!this.product) {
            this.pageTitle = 'No product found';
        } else {
            if (this.product.id === 0) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${this.product.productName}`;
            }
        }
    }

    deleteProduct(): void {
        if (!this.product || !this.product.id) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.product?.productName} was deleted`);
        } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id).subscribe({
                    next: () => this.onSaveComplete(`${this.product?.productName} was deleted`),
                    error: err => this.errorMessage = err
                });
            }
        }
    }

    saveProduct(): void {
        if (this.product) {
            if (this.product.id === 0) {
                this.productService.createProduct(this.product).subscribe({
                    next: () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
                    error: err => this.errorMessage = err
                });
            } else {
                this.productService.updateProduct(this.product).subscribe({
                    next: () => this.onSaveComplete(`The updated ${this.product?.productName} was saved`),
                    error: err => this.errorMessage = err
                });
            }
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    resetForm() {
        this.originalProduct =  this.product;
    }

    onSaveComplete(message?: string): void {
        this.resetForm();
        if (message) {
            this.messageService.addMessage(message);
        }
        this.router.navigateByUrl('products');
    }
 
    cancelForm() {
        this.router.navigate(['/products'], {queryParamsHandling: "preserve"});
    }
}
