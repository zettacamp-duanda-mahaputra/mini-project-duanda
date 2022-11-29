import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  menus: any = []

  defaultFilter = ""
  filterName = new FormControl(null)
  inputName = ""

  pageSize: number = 6
  pageIndex: number = 0
  itemLength: any
  pageEvent: any

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getAll()

    this.filterName.valueChanges.subscribe((data: any) => {
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
      name: this.inputName
    }

    this.menuService.get(pagination, match).subscribe((data: any) => {
      this.menus = data.data

      this.itemLength = data.paginator.total_items
    })
  }

  indexingPage(data: any) {
    this.pageIndex = data.pageIndex
    this.pageSize = data.pageSize

    this.getAll()

  }

}
