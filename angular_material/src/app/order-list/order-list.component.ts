import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderListService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  dataSource = new MatTableDataSource()
  balances:any
  displayedColumns: any[] = ['name', 'order_date', 'menu', 'amount', 'pcs', 'price', 'note', 'total'];

  pageSize: number = 5
  pageIndex: number = 0
  itemLength: any
  pageEvent: any


  constructor(private orderService:OrderListService) { }
  

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    const pagination = {
      limit: this.pageSize ? this.pageSize : 5,
      page: this.pageIndex ? this.pageIndex : 0
    }

    this.orderService.get(pagination).subscribe((data:any)=>{      
      this.dataSource.data = data?.data

      this.balances = data

      this.itemLength = data.paginator.total_items
    })
  }

  indexingPage(data: any) {
    this.pageIndex = data.pageIndex
    this.pageSize = data.pageSize

    this.getAll()

  }

}
