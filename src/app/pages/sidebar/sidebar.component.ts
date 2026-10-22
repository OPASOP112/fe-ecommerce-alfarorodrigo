import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isSidebarOpen = false;

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeOnMobile() { if (window.innerWidth <= 768) this.isSidebarOpen = false; }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}