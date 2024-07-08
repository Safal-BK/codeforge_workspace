import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component';
import { MobileMenuComponent } from '../../shared/mobile-menu/mobile-menu.component';
import { UserComponent } from '../../shared/user/user.component';
import { EmailComponent } from '../../shared/email/email.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    MobileMenuComponent,
    UserComponent,
    EmailComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  // Search

  constructor(private router: Router) { }

  navigateToSkillprobe(url: string) {
    window.open(url, '_blank');
  }

  navigateToPersonafit(url: string) {
    window.open(url, '_blank'); 
  }

  navigateToCodeforge(url: string) {
    window.open(url, '_blank'); 
  }

  showSearchDetails: boolean = false;

  showSearch(button: string) {
    if (button === 'Search') {
      this.showSearchDetails = true;
    }
  }

  hideSearch(button: string) {
    if (button === 'Search') {
      this.showSearchDetails = false;
    }
  }

  //Inbox

  showInboxDetails: boolean = false;

  showInbox(button: string) {
    if (button === 'Inbox') {
      this.showInboxDetails = true;
    }
  }

  hideInbox(button: string) {
    if (button === 'Inbox') {
      this.showInboxDetails = false;
    }
  }

  //Hamburger

  isDropdownOpenHam: boolean = false;
  isDropdownOpenUser: boolean = false;

  toggleDropdownHam(event: MouseEvent) {
    event.preventDefault();
    this.isDropdownOpenHam = !this.isDropdownOpenHam;
  }

  toggleDropdownUser(event: MouseEvent) {
    event.preventDefault();
    this.isDropdownOpenUser = !this.isDropdownOpenUser;
  }

  closeDropdowns() {
    this.isDropdownOpenHam = false;
    this.isDropdownOpenUser = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Check if the click is outside of both dropdowns
    const hamDropdown = document.getElementById('hamburger');
    const userDropdown = document.getElementById('user-menu-button');

    if (!hamDropdown?.contains(target) && !userDropdown?.contains(target)) {
      this.closeDropdowns();
    } else if (!hamDropdown?.contains(target)) {
      // Check if the click is outside of hamburger dropdown
      this.isDropdownOpenHam = false;
    } else if (!userDropdown?.contains(target)) {
      // Check if the click is outside of user dropdown
      this.isDropdownOpenUser = false;
    }
  }

  // Help

  // isDropdownOpenHelp: boolean = false;

  // toggleDropdownHelp() {
  //   this.isDropdownOpenHelp = !this.isDropdownOpenHelp;
  // }

  // closeDropdownHelp() {
  //   this.isDropdownOpenHelp = false;
  // }

  //Search

  isSearchOpen: boolean = false;

  toggleSearch(event: MouseEvent) {
    event.preventDefault();
    this.isSearchOpen = !this.isSearchOpen;
  }

  // Navbar scroll

  // isNavbarHidden: boolean = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (window.scrollY > 0) {
  //     this.isNavbarHidden = true;
  //   } else {
  //     this.isNavbarHidden = false;
  //   }
  // }

  isSidebarShowing = false;

  openSideBar() {
    this.isSidebarShowing = true;
  }

  closeSideBar() {
    this.isSidebarShowing = false;
  }
}