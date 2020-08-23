import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  data = new BehaviorSubject([]);
  data$ = this.data.asObservable();

  constructor() { }
}
