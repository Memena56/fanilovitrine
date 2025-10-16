import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-history',
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-history.component.html',
  styleUrl: './about-history.component.css'
})
export class AboutHistoryComponent implements OnInit {
  animationClass = 'page-enter';

  ngOnInit(): void {
      setTimeout(() => {
        this.animationClass = 'page-enter page-enter-active';
      }, 50);
  }
}
