import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class StockManagementService {
  constructor(private apollo: Apollo) {}

  getAllIngre() {
  
    return this.apollo.query({
      query: gql`
        query {
          GetAllIngredients{
            data {
              _id
              name
              stock
              status
            }
          }
        }
      `,fetchPolicy:'network-only'
    }).pipe(map((result:any)=>{
      return result.data.GetAllIngredients
    }))
  }

  getAllIngredients(paginator?:any,match?: any) {
    
    
    if(match.status == 'all'){
      match.status = null
    }

    return this.apollo.query({
      query: gql`
        query GetAllIngredients($paginator:paginator, $match: ingredientsInput){
          GetAllIngredients(paginator: $paginator, match: $match) {
            data {
              _id
              name
              stock
              status
            }
            paginator{
              total_items
            }
          }
        }
      `,fetchPolicy:'network-only', variables: {paginator, match}
    }).pipe(map((result:any)=>{
      return result.data.GetAllIngredients
    }))
  }

  getOneIngredient(data: any) {
    const id = data._id
    return this.apollo.query({
      query: gql`
        query getOneIngredient($id: ID){
          getOneIngredient(id: $id) {
            _id
            name
            stock
          }
        }
      `,
      variables:{id}
    });
  }

  addIngredient(value:any){
    const name = value.name
    const stock = Number(value.stock)

    return this.apollo.mutate({
      mutation: gql`
      mutation createIngredient($name: String, $stock: Int){
          createIngredient(data: {name: $name, stock: $stock}){
            _id
            name
            status
            stock
          }
      }`,
      variables:{name, stock}
    })
  }

  updateIngredient(id:any,value:any){
    const name = value.name
    const stock = Number(value.stock)

    return this.apollo.mutate({
      mutation: gql`
      mutation updateIngredient($data: ingredientsInput){
        updateIngredient(data: $data)
      }`,
      variables: { data: {name, stock, id}}
    })
  }

  deleteIngredient(id:any){
    return this.apollo.mutate({
      mutation: gql`
      mutation deleteIngredient($id:ID, ){
        deleteIngredient(id:$id)
      }`,
      variables:{id}
    })
  }

}
