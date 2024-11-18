import { Routes } from '@angular/router';
import { HomeComponent } from './product/home/home.component';

export const routes: Routes = [
    {path:"products/home",component:HomeComponent},
    {path:"products",redirectTo:"products/home",pathMatch:'full'},
    {path:"",redirectTo:"products/home",pathMatch:'full'},

];
