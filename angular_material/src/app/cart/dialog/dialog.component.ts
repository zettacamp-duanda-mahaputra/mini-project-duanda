import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  displayedColumns: string[] = ['order_date', 'recipe_name', 'total_price', 'order_status']
  dataSource = new MatTableDataSource

  constructor(private cartServivce:CartService, private dialogref: MatDialogRef<ListComponent>) { }

  ngOnInit(): void {
    this.cartServivce.history().subscribe((data:any)=>{
      console.log(data);
      
      this.dataSource = data;
      
      
      console.log(this.dataSource);
      
    })
  }

  onClose(){
    this.dialogref.close()
  }

}
