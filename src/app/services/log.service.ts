import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs'

import {Log} from '../Models/log';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null , text: null , date: null});
  selectedLog = this.logSource.asObservable();

  private something = new BehaviorSubject<Log>({text: null , date: null, id: null});
  selectedSomething = this.something.asObservable();



  constructor() {
    // this.logs = [
    //   {id: '1' , text: 'Generated Component' , date: new Date('12/26/2020') },
    //   {id: '2' , text: 'Bootstrap Component' , date: new Date('12/26/2020') },
    //   {id: '3' , text: 'added log Component' , date: new Date('12/26/2020') }
      
    // ]
    this.logs = [];
   }
  //  hard coded , this is synchronosly , need to do it asynchronously , need to subscribe.
   getLogs(): Observable<Log[]>{
      if(localStorage.getItem('logs') === null) {
        this.logs=[];
      } else {
        this.logs=JSON.parse(localStorage.getItem('logs'));
      }


     return of(this.logs);
   }

  setFormLog(log: Log){
    console.log(log);
      this.logSource.next(log);
      this.something.next(log);
   }
   
   addLog(log: Log){
      this.logs.unshift(log);

      // implement local storage:
      localStorage.setItem('logs' , JSON.stringify(this.logs));
   }
   updateLog(log: Log){ 
        this.logs.forEach((cur , index) => { //looping 
            if(log.id === cur.id){
               this.logs.splice(index , 1);
            }
        });
        this.logs.unshift(log);


        localStorage.setItem('logs' , JSON.stringify(this.logs));
   }
   deleteLog(log: Log){
    this.logs.forEach((cur , index) => { //looping 
      if(log.id === cur.id){
         this.logs.splice(index , 1);
      }
  });


  localStorage.setItem('logs' , JSON.stringify(this.logs));
   }
}
