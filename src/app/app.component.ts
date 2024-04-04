import { Component, HostBinding, computed, inject, signal } from '@angular/core';
import { PokePresentationComponent } from './pages/presentation/presentation.component';
import { dataService } from './services/data.service';
import { ThemeDirective } from './directives/theme.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokePresentationComponent, ThemeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public data = inject(dataService)

  readonly darkMode$ = computed(() => this.data.darkMode());

  setDarkMode(darkMode: boolean):void {
    this.data.darkMode.set(darkMode);
  }

  ngOnInit(){
    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDarkMode(darkModeMediaQuery.matches)
  }

  title = 'Poke App';
}
