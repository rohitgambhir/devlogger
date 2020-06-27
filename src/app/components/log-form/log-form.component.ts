import { Component, OnInit, ɵConsole } from '@angular/core';

// to pass to form , need to listen here . 
import {Log} from '../../Models/log';
import {LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;
   // injecting service to the constructor
  constructor(private logService : LogService) { }

  ngOnInit(): void {
     // subscribe to selected log observable 
     this.logService.selectedLog.subscribe(log => {
        console.log('hello' ,log);
         if(log.id !== null){     
               this.isNew = false;
               this.id = log.id;
               this.text =log.text;
               this.date = log.date;
         }
      });
  }
  OnSubmit(){
     console.log(123);
     if(this.isNew) {
       console.log('newvalue hu');        const newLog = {
           id: this.generateId(),
           text: this.text,
           date: new Date()
        }
        this.logService.addLog(newLog);
     } else {
         const updLog = {
           id: this.id,
           text: this.text,
           date: new Date()
         }
         // update log
         this.logService.updateLog(updLog);
     }
     this.clearState();
  }
  clearState(){
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
  }
  generateId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    
    // console.log(uuidv4());
   

}


