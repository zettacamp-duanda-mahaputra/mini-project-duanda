import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private apollo: Apollo) { }

  forgot(email:any) {
    return this.apollo.mutate({
      mutation: gql`
      mutation ReqForgetPassword($email: String) {
         reqForgetPassword(email: $email)
      }
      `, variables:{email}
    })
  }
}
