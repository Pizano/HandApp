import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  mode = '';
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['model', 'brand', 'kilometers', 'price', 'description', 'year', 'Editar', 'Eliminar'];

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild('callAPIDialog',{static: true}) callAPIDialog: TemplateRef<any>;

  constructor(
    private ProductService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mode = 'indeterminate';
    this.getProduct();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getProduct(): void {
   
    this.ProductService.getProduct()
      .subscribe(response => {
        this.dataSource.data = response as Product[];
        this.mode = 'determinate'
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id :number) {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        
        if (result !== undefined) {
            if (result === 'yes') {
               
                this.ProductService.DeleteProduct(id)
                .subscribe(response => {
                 this.getProduct();
                })
            } else if (result === 'no') {
                
            }
        }
    })
}
}
