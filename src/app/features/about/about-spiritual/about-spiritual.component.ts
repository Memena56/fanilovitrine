import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-spiritual',
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-spiritual.component.html',
  styleUrl: './about-spiritual.component.css'
})
export class AboutSpiritualComponent implements OnInit{
  animationClass = 'page-enter';

  ngOnInit(): void {
      setTimeout(() => {
        this.animationClass = 'page-enter page-enter-active';
      }, 50);
  }
}
