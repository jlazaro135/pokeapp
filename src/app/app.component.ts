import { Component, HostBinding, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private darkMode = signal<boolean>(false);
  readonly darkMode$ = computed(() => this.darkMode());

  @HostBinding('class.dark') get mode() {
    return this.darkMode()
  }

  setDarkMode(darkMode: boolean):void {
    this.darkMode.set(darkMode);
  }

  ngOnInit(){
    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDarkMode(darkModeMediaQuery.matches)
  }

  title = 'Poke App';
}
