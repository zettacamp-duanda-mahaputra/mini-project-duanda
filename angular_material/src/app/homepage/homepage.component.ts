import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  items: any

  constructor(private homeService: HomepageService) { }

  ngOnInit(): void {
    this.homeService.get().subscribe((data: any) => {
      this.items = data?.data?.getAllRecipes.data
      console.log(this.items);
      
      
    })
  }

}
