import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuManagementService {
  constructor(private apollo: Apollo) {}

  get(limit:any, page:any) {
    console.log(limit, page);
    
    return this.apollo
      .query({
        query: gql`
          query getAllRecipes($limit: Int, $page: Int){
            getAllRecipes(paginator: { limit: $limit, page: $page }) {
              data {
                _id
                available
                price
                recipe_name
                image
                description
                status
                ingredients {
                  ingredient_id {
                    _id
                    name
                  }
                  stock_used
                }
              }
              paginator{
                total_items
              }
            }
          }
        `, variables:{limit, page},fetchPolicy: 'network-only',
      })
      .pipe(
        map((result: any) => {
          return result.data.getAllRecipes;
        })
      );
  }

  add(data: any) {
    data.price = Number(data.price);
    return this.apollo.mutate({
      mutation: gql`
        mutation createRecipe($data: recipeInput) {
          createRecipe(data: $data) {
            image
            _id
            price
            recipe_name
            status
          }
        }
      `,
      variables: { data },
    });
  }

  update(value: any, id:any) {
    const recipe_name = value.recipe_name;
    const price = Number(value.price);
    const image = value.image;
    const ingredients = value.ingredients

    return this.apollo.mutate({
      mutation: gql`
        mutation updateRecipeMain($data: recipeInput, $id: ID) {
          updateRecipeMain(data: $data, id: $id)
        }
      `,
      variables: { id, data: { recipe_name, price, image, ingredients } },
    });
  }

  updateStatus(status: any, id: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($status: statusRecipe, $id: ID) {
          updateStatusRecipe(status: $status, id: $id)
        }
      `,
      variables: { status, id },
    });
  }

  delete(id: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteRecipe($id: ID) {
          deleteRecipe(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
