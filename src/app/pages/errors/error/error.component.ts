import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { errorMessage } from '../../../interfaces';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export default class ErrorComponent {

  public router = inject(Router);
  public request = inject(RequestService);

  public errorMessage?: errorMessage


  ngOnInit(){
    this.initErrorView();
  }


  initErrorView(){
    console.log(this.request.errorMessage)
    this.errorMessage = this.request.errorMessage
    if(!this.errorMessage) this.router.navigateByUrl('/')
  }
}
