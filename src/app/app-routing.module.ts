import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { LayoutSampleComponent } from './layout-sample/layout-sample.component';


const appRoutes: Routes = [
  { path: '', component: FormGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
