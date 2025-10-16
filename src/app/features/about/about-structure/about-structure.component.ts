import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-structure',
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-structure.component.html',
  styleUrl: './about-structure.component.css'
})
export class AboutStructureComponent implements OnInit{
  animationClass = 'page-enter';

  ngOnInit(): void {
      setTimeout(() => {
        this.animationClass = 'page-enter page-enter-active';
      }, 50);
  }
}
