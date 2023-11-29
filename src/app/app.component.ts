import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

const CLIENT_ID = 'amzn1.application-oa2-client.47ebe1da0ee6442d9b8846e4fe110e40';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hyperads';

  clientID = '';

  showLoginWithAmazonButton: boolean = false;

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

  setClientId() {
    if (this.clientID.length) {
      this.showLoginWithAmazonButton = true;
    }
  }

  handleLogin() {
    // Handle the login response here
    const options: any = {}
    options.scope = 'profile';
    const _window = window as any;
    _window.amazon.Login.setClientId(this.clientID);
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
