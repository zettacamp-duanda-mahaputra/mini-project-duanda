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


  constructor(private orderService:OrderListService) { }
  

  ngOnInit(): void {
    this.orderService.get().subscribe((data:any)=>{      
      this.dataSource.data = data?.data

      this.balances = data
    })
  }

}
