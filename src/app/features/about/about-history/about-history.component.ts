import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-history',
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-history.component.html',
  styleUrl: './about-history.component.css'
})
export class AboutHistoryComponent {}
