import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private apollo: Apollo) { }

  get(paginator?: any, match?: any) {
    return this.apollo.query({
      query: gql`
        query getAllRecipes($paginator: paginator, $match: match) {
          getAllRecipes(paginator: $paginator, match: $match
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
            paginator{
                total_items
          }
        }
       }
      `, fetchPolicy: 'network-only', variables: { paginator, match }
    }).pipe(map((result: any) => {
      return result.data.getAllRecipes;
    }))
  }


}
