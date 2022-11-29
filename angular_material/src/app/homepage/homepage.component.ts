import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomepageService } from './homepage.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  message: any = null;
  items: any
  specials:any

  constructor(private homeService: HomepageService) { }

  ngOnInit(): void {
    this.homeService.get().subscribe((data: any) => {
      this.items = data?.data?.getAllRecipes.data
      console.log(this.items);
    })
    this.getSpecial()
    this.requestPermission()
    this.listen()
  }

  getSpecial(){
    this.homeService.getAll().subscribe((data:any)=>{
      this.specials = data?.data?.getAllRecipes.data
    })
  }

  requestPermission() {
    console.log('request permission function');
    
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('token anda' + currentToken);
        this.homeService.saveTokenFCM(currentToken).subscribe((data: any) => {
          console.log(data);
        })
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }


}
