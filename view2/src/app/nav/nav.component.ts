import { CommonModule } from '@angular/common';
import { Component ,HostListener, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../shared/menu/menu.component';
import { MobileMenuComponent } from '../shared/mobile-menu/mobile-menu.component';
import { EmailComponent } from '../shared/email/email.component';
import { UserComponent } from '../shared/user/user.component';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterModule,MenuComponent,MobileMenuComponent,EmailComponent,UserComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit  {
  userData: any;
  isDropdownOpenUser: boolean = false;
  constructor (private authService: AuthService) {
    
  }
  toggleDropdownUser(event: MouseEvent) {
    event.preventDefault();
    this.isDropdownOpenUser = !this.isDropdownOpenUser;
  }

  closeDropdowns() {
    this.isDropdownOpenUser = false;
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.getUserData();
    } else {
      this.authService.onLoginSuccess().subscribe(() => {
        // Call getUserData after successful login
        this.getUserData();
      });
    }
    
  }

  getUserData() {
    this.authService.getUserData()
        .subscribe(data => {
          this.userData = data;
          console.log(this.userData);
        });
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const userDropdown = document.getElementById('user-menu-button');

    if (!userDropdown?.contains(target)) {
      this.closeDropdowns();
    } else if (!userDropdown?.contains(target)) {
      this.isDropdownOpenUser = false;
    }
  }

  isSidebarShowing = false;

  openSideBar() {
    this.isSidebarShowing = true;
  }

  closeSideBar() {
    this.isSidebarShowing = false;
  }

}
