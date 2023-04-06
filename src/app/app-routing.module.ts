import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path : 'dashboard', component : DashboardComponent},
  { path : 'detail/:id', component: HeroDetailComponent },
];
//route module이 한 일이라곤 forRoot를 사용해서 routes를 등록한거라 그걸 export하면 끝인거다.
//그럼 export한거를 누가 어떻게 쓰냐 보면되겠지?
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }