import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  getToken(myForm: any) {

    return this.apollo.mutate({
      mutation: gql`
        mutation LoginUser($email: String, $password: String) {
          loginUser(email: $email, password: $password) {
            _id
            token
            userType {
              role
              permission {
                page
                view
              }
            }
          }
        }
      `,
      variables: myForm,
    });
  }
}
