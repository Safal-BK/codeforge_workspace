import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-callback',
  template: `
    <div>
      Logging in...
    </div>
  `,
  styleUrls: []
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.exchangeCodeForToken(code);
      } else {
        // Handle error or redirect to login page
      }
    });
  }
}
