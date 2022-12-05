import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  create(myForm:any) {    
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateUser($data: userInput) {
        createUser(data: $data) {
          _id
          first_name
          email
          last_name
        }
      }`,variables: {data:myForm}
    })
  }
}
