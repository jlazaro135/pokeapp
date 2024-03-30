import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconLight } from '../../../assets/icons/light.component';
import { IconDark } from '../../../assets/icons/dark.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconLight, IconDark],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() darkMode!: boolean
  @Output() setTheme = new EventEmitter<boolean>();

  handleClick(){
    this.setTheme.emit(!this.darkMode)
  }
}
