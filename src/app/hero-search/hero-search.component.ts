import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor( private heroService: HeroService ) { }

  search( term: string ): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.heroes$ =  this.searchTerms.pipe(
      // wait 300ms after keystroke
      debounceTime(300),

      // ignore new term if same previus term
      distinctUntilChanged(),

      // switch to new term if same previus term
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
