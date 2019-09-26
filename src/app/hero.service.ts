import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService ) { }

  getHeroes(): Observable<Hero[]>  {
    this.messageService.add('HeroService: fetch heroes' );
    return of (HEROES);
  }

}


