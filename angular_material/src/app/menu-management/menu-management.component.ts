import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { MenuManagementService } from './menu-management.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Dropdown } from './model/dropdown';
import { Drop } from './model/drop';
import { DialogSpecialComponent } from './dialog-special/dialog-special.component';

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
    'highlight',
    'special',
    'action'
  ];

  availableSources: Dropdown[] = Drop;
  filterStatus:any = null

  defaultFilter = ""
  filterName = new FormControl(null)
  inputName = ""

  pageSize: number = 6
  pageIndex: number = 0
  itemLength: any
  pageEvent: any

  constructor(
    private menuManagementService: MenuManagementService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();

    this.filterName.valueChanges.subscribe((data:any)=>{
      this.inputName = data      
      this.getAll();
    })
    
  }

  getAll() {
    const pagination = {
      limit: this.pageSize ? this.pageSize : 5,
      page: this.pageIndex ? this.pageIndex : 0
    }

    let match = {
      status: this.filterStatus,
      name: this.inputName
    }


    this.menuManagementService.get(pagination, match).subscribe((data: any) => {
      this.dataSource.data = data.data;

      this.itemLength = data.paginator.total_items

    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: err.message
      })
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
        }, err=>{
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.message
          })
        });
      }
    });
  }

  onClick(event: any, element: any) {
    const status = event.checked ? 'publish' : 'unpublish';

    this.menuManagementService.updateStatus(status, element._id).subscribe(() => {
      if(status == 'publish'){
        Swal.fire({
          icon:'success',
          text:'menu published'
        }).then(()=>{
          this.getAll()
        })
      }else{
        Swal.fire({
          icon:'info',
          text:'menu unpublished'
        }).then(()=>{
          this.getAll()
        })
      }
     
    });
  }

  onShow(event: any, element: any) {
    const highlight = event.checked ? true : false;

    this.menuManagementService.updateHighlight(highlight, element._id).subscribe(() => {
      if(highlight == true){
        Swal.fire({
          icon:'success',
          text:'menu add to menu highlight'
        }).then(()=>{
          this.getAll()
        })
      }else{
        Swal.fire({
          icon:'info',
          text:'menu remove from menu highlight'
        }).then(()=>{
          this.getAll()
        })
      }
      
    })
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuManagementService.delete(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Menu has been deleted.',
            'success'
          )
        })
        this.getAll();
      }
    })

  }

  indexingPage(data: any) {
    this.pageIndex = data.pageIndex
    this.pageSize = data.pageSize

    this.getAll()

  }

  openSpecial(data: any) {
    console.log(data);
    
    const dialogRef = this.dialog.open(DialogSpecialComponent, {
      data: data || null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.menuManagementService.updateSpecial(result).subscribe((data) => {        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data Completed',
        }).then(() => {
          this.getAll();
        });
      }, err=>{
        Swal.fire({
          icon:'info',
          text: err.message
        }).then(()=>{
          this.getAll();
        })
      });

    })
  }

  onFilterStatus(event:any){
    this.filterStatus = event
    this.getAll()
  }


}
