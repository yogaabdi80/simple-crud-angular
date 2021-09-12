import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public loading = new BehaviorSubject<boolean>(true);
  public loading$ = this.loading.asObservable();

  public idEmployee = new BehaviorSubject<number>(null);
  public idEmployee$ = this.idEmployee.asObservable();
  constructor() { }

  setLoadingScreen(bool: boolean) {
    this.loading.next(bool);
  }

  setIdEmployee(id: number) {
    this.idEmployee.next(id);
  }
}
