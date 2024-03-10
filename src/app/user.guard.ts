import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {

  let _Router = inject(Router)
  if (localStorage.getItem('token')){
    _Router.navigate(['/home'])
    return false
  } else{
    return true
  }
};
