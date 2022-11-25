import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private apollo: Apollo) {}

  get() {
    return this.apollo.query({
      query: gql`
        query {
          getAllRecipes(
            paginator: { limit: 30, page: 0 }
            match: { status: publish }
          ) {
            data {
              _id
              available
              price
              recipe_name
              image
              description
              ingredients {
                ingredient_id {
                  _id
                  name
                  status
                  stock
                }
              }
            }
          }
        }
      `,
    });
  }

 
}
