import { Component, OnInit } from '@angular/core';
import { Hero } from "../model/hero";
import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[] = [];


  getHeroes() :void{
    // this.heroes= this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
      console.log("Test");
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  constructor(private heroService:HeroService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
}
