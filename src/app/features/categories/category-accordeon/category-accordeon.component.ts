import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNode } from '../../categories/category-node.model';

@Component({
  standalone: true,
  selector: 'app-category-accordeon',
  imports: [CommonModule],
  templateUrl: './category-accordeon.component.html',
  styleUrl: './category-accordeon.component.css'
})
export class CategoryAccordeonComponent {
  @Input() categories: CategoryNode[] = [];
  @Input() selectedCategoryIds: string[] = [];
  @Output() categoryFilterChange = new EventEmitter<string[]>();

  expandedIds: Set<string> = new Set();

  toggleExpand(id: string) {
    this.expandedIds.has(id)
      ? this.expandedIds.delete(id)
      : this.expandedIds.add(id);
  }

  isExpanded(id: string): boolean {
    return this.expandedIds.has(id);
  }

  selectCategory(id: string) {
    this.categoryFilterChange.emit([id]);
  }
}
