import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { AboutService, Gouvernance } from '../about.service';
import { AboutSidebarComponent } from '../about-sidebar/about-sidebar.component';

@Component({
  selector: 'app-about-leaders',
  standalone: true,
  imports: [CommonModule, AboutSidebarComponent],
  templateUrl: './about-leaders.component.html',
  styleUrl: './about-leaders.component.css'
})
export class AboutLeadersComponent implements OnInit {
  aumoniers: Gouvernance[] = [];
  commissaires: Gouvernance[] = [];
  loading = true;
  animationClass = 'page-enter';

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animationClass = 'page-enter page-enter-active';
    }, 50);

    this.aboutService.getGouvernances().subscribe({
      next: (data) => {
        const sorted = data.sort((a,b) => a.startYear - b.startYear);
        this.aumoniers = sorted.filter(g => g.role === 'aumonier');
        this.commissaires = sorted.filter(g => g.role === 'commissaire');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des leaders:', err);
        this.loading = false;
      }
    });
  }

}
