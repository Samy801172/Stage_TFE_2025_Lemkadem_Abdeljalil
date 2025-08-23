import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberRefreshService {
  // Observable pour notifier les composants qu'il faut rafraîchir la liste des membres
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  // Méthode à appeler pour notifier un rafraîchissement
  triggerRefresh() {
    this.refreshSubject.next();
  }
} 