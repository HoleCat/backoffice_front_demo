import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  realRol: String
  
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRol =  route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach(rol =>{
    
      if(rol === 'ROLE_ADMIN'){
          this.realRol = 'admin';
        }
      }); 

      if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
          this.router.navigate(['/auth']);
          return false;
      }
    return true;
  }
  
}
