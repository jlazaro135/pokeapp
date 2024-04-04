import { Directive, HostBinding, inject } from '@angular/core';
import { dataService } from '../services/data.service';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective {
  private data = inject(dataService)

  @HostBinding('class.dark') get mode() {
    return this.data.darkMode()
  }

}
