import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <div>
      Logging in...
    </div>
  `,
  styleUrls: []
})
export class LogoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    
      if (this.authService.isLoggedIn()) {
        this.authService.logout();
        
      } else {
        this.authService.initiateOAuthLogin(true);
        // Handle error or redirect to login page
      }
  }
}
