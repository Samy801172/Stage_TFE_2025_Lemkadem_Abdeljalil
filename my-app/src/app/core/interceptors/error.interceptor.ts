import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Requête sortante:', req.url, req.method, req.body);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Erreur détaillée:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
        error: error.error
      });

      // On propage l'objet d'erreur complet au lieu d'une simple chaîne
      // Cela permet de conserver les informations comme error.error.code et error.error.message
      // qui sont nécessaires pour la gestion des erreurs spécifiques (ex: USER_INACTIVE)
      return throwError(() => error);
    })
  );
}; 