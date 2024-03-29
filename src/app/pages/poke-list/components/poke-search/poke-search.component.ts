import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'poke-search',
  standalone: true,
  imports: [],
  templateUrl: './poke-search.component.html',
  styleUrl: './poke-search.component.scss',
})
export class PokeSearchComponent implements OnInit, OnDestroy {
  @Output()
  public onDebounce = new EventEmitter<string>()

  private debouncer: Subject<string> = new Subject();
  private debouncerSuscription?: Subscription;

  ngOnInit() {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value)
      });
  }

  ngOnDestroy() {
    if (this.debouncerSuscription) this.debouncerSuscription.unsubscribe();
  }

  onInput(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
