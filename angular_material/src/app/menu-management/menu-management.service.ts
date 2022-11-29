import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuManagementService {
  constructor(private apollo: Apollo) { }

  get(paginator:any, match:any) {
     
    if(match.status == 'all'){
      match.status = null
    }
    

    return this.apollo
      .query({
        query: gql`
          query getAllRecipes($paginator:paginator, $match: match){
            getAllRecipes(paginator: $paginator, match:$match) {
              data {
                _id
                available
                price
                recipe_name
                image
                description
                status
                highlight
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
        `, variables: { paginator, match }, fetchPolicy: 'network-only',
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

  update(value: any, id: any) {
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

  updateHighlight(highlight: any, id: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($highlight: Boolean, $id: ID) {
          updateHighlightRecipe(highlight: $highlight, id: $id){
            _id
            highlight
            recipe_name
          }
        }
      `, variables: { highlight, id },
    });
  }

  updateSpecial(data:any) {
    const id = data._id
    const specialOver = true
    const disc = data.discount

    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateSpecialOver($id: ID, $specialOver: Boolean, $disc: Int) {
        updateSpecialOver(id: $id, specialOver: $specialOver,disc: $disc) {
          _id
          image
          disc
          recipe_name
          price
        }
      }`, variables:{id, specialOver, disc}
    })
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
