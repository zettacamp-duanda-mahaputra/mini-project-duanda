import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private apollo:Apollo) { }


  get() {
    return this.apollo.query({
      query: gql`
        query {
          getAllRecipes(paginator:{limit:30, page:0}, match: {highlight: true}) {
            data {
              _id
              recipe_name
              image
            }
          }
        }
        
      `, fetchPolicy: 'network-only'
    });
  }

  getAll() {
    return this.apollo.query({
      query: gql`
        query {
          getAllRecipes(paginator:{limit:30, page:0}, match: {specialOver: true}) {
            data {
              _id
              recipe_name
              image
              price
              disc
            }
          }
        }
        
      `, fetchPolicy: 'network-only'
    });
  }

  saveTokenFCM(token: any) {
    console.log('save token');
    
    return this.apollo.query({
      query: gql`
      mutation SaveTokenFCM($token: String) {
      saveTokenFCM(token: $token)
    }
      `, fetchPolicy: 'network-only', variables: {token }
    })
  }


}
