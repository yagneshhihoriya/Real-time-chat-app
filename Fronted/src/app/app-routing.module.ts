import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'form-builder',
  //   loadChildren: () =>
  //     import('./modules/form-builder/form-builder.module').then(
  //       (m) => m.FormBuilderModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
