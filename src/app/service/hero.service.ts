import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { HEROES } from '../testData/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    //목 데이터로 불러오는 경우였다.
    // const heroes = of(HEROES);
    // this.messageService.add("heroService : fatched heroes");
    // return heroes;
    
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: 서버에 새로운 히어로를 추가합니다. */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: 서버에서 히어로를 제거합니다. */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  /**
   * HTTP 요청이 실패한 경우를 처리합니다.
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * 이거 자체가 에러를 만나면 실행되긴 한다.
   * @param operation - 실패한 동작의 이름
   * @param result - 기본값으로 반환할 객체
   */
  private handleError<T>(operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  private log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
