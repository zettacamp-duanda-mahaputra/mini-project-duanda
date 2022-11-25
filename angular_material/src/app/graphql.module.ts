import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const uri = 'https://a211-114-79-32-135.ap.ngrok.io/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http = httpLink.create({ uri });

  const middleware = new ApolloLink((operation, forward) => {
    const authService = new AuthService();
    const token = authService.getToken();
    const id = authService.getUserId();

    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `${token || null}`).set('userid', id ? id : '')
    });

    return forward(operation)
  });

  const link = middleware.concat(http);


  return {
    link, cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
