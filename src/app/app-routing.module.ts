import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'prefix' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'introslider', loadChildren: () => import('./introslider/introslider.module').then(m=>m.IntrosliderPageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'authenticity', loadChildren: './authenticity/authenticity.module#AuthenticityPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'upcoming', loadChildren: './upcoming/upcoming.module#UpcomingPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'social', loadChildren: './social/social.module#SocialPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'review', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' },
  { path: 'demo', loadChildren: './demo/demo.module#DemoPageModule' },
  { path: 'eprofile', loadChildren: './eprofile/eprofile.module#EprofilePageModule' },
  { path: 'searchbar', loadChildren: './searchbar/searchbar.module#SearchbarPageModule' },
  { path: 'no-internet', loadChildren: './no-internet/no-internet.module#NoInternetPageModule' },
  { path: 'virtual/:productId', loadChildren: './virtual/virtual.module#VirtualPageModule' },
  { path: 'virtual', loadChildren: './virtual/virtual.module#VirtualPageModule' },
  { path: 'videos', loadChildren: './videos/videos.module#VideosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
