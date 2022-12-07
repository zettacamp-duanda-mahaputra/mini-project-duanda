import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartGuard } from './guards/cart.guard';
import { MenuGuard } from './guards/menu.guard';
import { OrderGuard } from './guards/order.guard';
import { StockGuard } from './guards/stock.guard';

const routes: Routes = [
  { path: '', redirectTo: '/Homepage', pathMatch: 'full' },
  { path: 'Homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'About', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'Register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'Cart', canActivate:[CartGuard], loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'Login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'Menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'F&BManagement', canActivate:[MenuGuard] ,loadChildren: () => import('./menu-management/menu-management.module').then(m => m.MenuManagementModule) },
  { path: 'StockManagement',canActivate:[StockGuard], loadChildren: () => import('./stock-management/stock-management.module').then(m => m.StockManagementModule) },
  { path: 'OrderList',canActivate:[OrderGuard], loadChildren: () => import('./order-list/order-list.module').then(m => m.OrderListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
