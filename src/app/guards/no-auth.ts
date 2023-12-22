import { inject } from "@angular/core";
import { Router } from "@angular/router";
import {LocalService} from "../services/local.service";

export const NoAuth = (): boolean => {
  const localService: LocalService = inject(LocalService);
  const router: Router = inject(Router);

  if(localService.checkData('user')) {
    router.navigate(['/users']);
    return false;
  }

  return true;
}
