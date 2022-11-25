import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { MenuManagementService } from './menu-management.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Dropdown } from './model/dropdown';
import { Drop } from './model/drop';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css'],
})
export class MenuManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: any[] = [
    'receipe_name',
    'image',
    'price',
    'status',
    'action',
  ];

  statusFilter = new FormControl();
  filteredValues: any = { status: '' };
  availableSources: Dropdown[] = Drop;

  pageSize:number = 6
  pageIndex:number = 0
  itemLength:any
  pageEvent:any

  constructor(
    private menuManagementService: MenuManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();

    this.statusFilter.valueChanges.subscribe((statusFilterValue) => {
      this.filteredValues['status'] = statusFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): any {
      console.log(data, filter);

      let searchString = JSON.parse(filter);
      let statusFound = data.status == searchString.status;

      return statusFound;
    };
    return myFilterPredicate;
  }

  getAll() {
    this.menuManagementService.get(this.pageSize,this.pageIndex).subscribe((data: any) => {
      this.dataSource.data = data.data;
      
      this.itemLength = data.paginator.total_items
      
    });
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data || null,
      width: '500px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      console.log(result);

      if ('_id' in result) {
        
        this.menuManagementService
          .update(result, result._id)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Data Completed',
            }).then(() => {
              this.getAll();
            });
          });
      } else {
        this.menuManagementService.add(result).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data Completed',
          }).then(() => {
            this.getAll();
          });
        });
      }
    });
  }

  onClick(event: any, element: any) {
    console.log(event);
    const status = event.checked ? 'publish' : 'unpublish';

    this.menuManagementService.updateStatus(status, element._id).subscribe(()=>{
      this.getAll()
    });
  }

  onDelete(id: any) {
    this.menuManagementService.delete(id).subscribe(() => {
      this.getAll();
    });
  }

  indexingPage(data:any){
    console.log(data);
    this.pageIndex = data.pageIndex
    this.pageSize = data.pageSize
    
    this.getAll()
    
  }


}
