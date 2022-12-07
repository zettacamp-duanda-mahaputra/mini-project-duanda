import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private apollo:Apollo) { }

  get(token:any){
    return this.apollo.query({
      query:gql`
      query cekUserToken($token: String) {
        cekUserToken(token: $token)
      }
      `,fetchPolicy:'network-only', variables:{token}
    })
  }

  update(token:any, pass:any){
    return this.apollo.mutate({
      mutation:gql`
      mutation UpdatePassword($token: String, $pass: String) {
        updatePassword(token: $token, pass: $pass)
      }
      `, variables:{token,pass}
    })
  }
}
