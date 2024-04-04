import { Component, HostBinding, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { dataService } from '../../services/data.service';

@Component({
  selector: 'poke-presentation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css',
})
export class PokePresentationComponent {
  public data = inject(dataService)

  readonly darkMode$ = computed(() => this.data.darkMode())

  setDarkMode(darkMode: boolean): void {
    this.data.darkMode.set(darkMode);
  }

  ngOnInit() {
    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.data.setDarkMode(darkModeMediaQuery.matches);
  }

}
