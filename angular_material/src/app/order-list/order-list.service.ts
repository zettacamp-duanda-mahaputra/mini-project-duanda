import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(private apollo: Apollo) { }

  get(paginator?:any) {
    return this.apollo.query({
      query: gql`
        query GetBalance($paginator:paginator) {
          getBalance(paginator:$paginator) {
            balance
            data {
              menu {
                recipe_id {
                  recipe_name
                }
                note
                amount
                price {
                  total
                  pcs
                }
              }
              total_price
              order_date
              user_id {
                detail_user {
                  first_name
                  last_name
                }
              }
            }
          }
        }
      `,fetchPolicy:'network-only', variables:{paginator}
    }).pipe(map((result:any)=>{
      return result?.data?.getBalance;
    }))
  }
}
