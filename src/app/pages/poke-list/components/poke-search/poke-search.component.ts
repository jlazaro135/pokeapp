import { Component, EventEmitter, Input, OnDestroy, AfterViewInit, Output, ElementRef, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'poke-search',
  standalone: true,
  imports: [],
  templateUrl: './poke-search.component.html',
  styleUrl: './poke-search.component.css',
})
export class PokeSearchComponent implements AfterViewInit, OnDestroy {
  @Input() value?: string
  @Output()
  public onDebounce = new EventEmitter<string>()

  @ViewChild('input') myInput?: ElementRef<HTMLInputElement>;
  public debouncer: Subject<string> = new Subject();
  public debouncerSuscription?: Subscription;

  ngAfterViewInit() {
    if (this.myInput) {
      this.myInput.nativeElement.value = this.value ?? '';
    }
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value)
      });
  }

  ngOnDestroy() {
    if (this.debouncerSuscription) this.debouncerSuscription.unsubscribe();
  }

  onInput(searchTerm: string ) {
    this.debouncer.next(searchTerm);
  }
}
