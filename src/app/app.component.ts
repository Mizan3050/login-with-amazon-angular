import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, tap } from 'rxjs';
declare const amazon: any; // Import the Amazon SDK
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hyperads';

  constructor(
    private route: ActivatedRoute
  ) {

  }

  get code() {
    return this.route.queryParams.pipe(
      map((params: any) => {
        return params?.code
      })
    )
  }

  handleLogin() {
    // Handle the login response here
    const options: any = {}
    options.scope = 'profile';
    const _window = window as any;
    _window.amazon.Login.setClientId('amzn1.application-oa2-client.1432decfe00b477c878ce7a90c339500');
    _window.amazon.Login.setRegion('EU');

    options.scope = 'advertising::campaign_management profile';
    options.scope_data = {
      'profile': { 'essential': false }
    };
    options.pkce = true; // SDK generates a `code_verifier` and `code_challenge`
    _window.amazon.Login.authorize(options, 'https://login-with-amazon.netlify.app');

    return false;
  }
}
