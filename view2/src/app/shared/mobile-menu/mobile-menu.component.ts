import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule , RouterOutlet } from '@angular/router';


interface SubMenuStatus {
  jobs: boolean;
  candidates: boolean;
  // Add more submenu identifiers if needed
}


@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
    // Initialize the submenu open status object
    isSubMenuOpen: SubMenuStatus = {
      jobs: false,
      candidates: false,
      // Initialize other submenu identifiers if needed
    };
  
    // Method to toggle the submenu based on its identifier
    toggleSubMenu(subMenu: keyof SubMenuStatus): void {
      this.isSubMenuOpen[subMenu] = !this.isSubMenuOpen[subMenu];
    }
}
