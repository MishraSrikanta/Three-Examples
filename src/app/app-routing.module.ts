import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WindowComponent } from './window/window.component';

const routes: Routes = [
  {path: 'Window' , component: WindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
