import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-dioceses',
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-dioceses.component.html',
  styleUrl: './about-dioceses.component.css'
})
export class AboutDiocesesComponent implements OnInit {
  animationClass = 'page-enter';

  ngOnInit(): void {
      setTimeout(() => {
        this.animationClass = 'page-enter page-enter-active';
      }, 50);
  }
}
