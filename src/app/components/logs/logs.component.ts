import { Component, OnInit } from '@angular/core';
import {Log} from '../../Models/log';
import {LogService } from '../../services/log.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
   id: string;
   text: string;
   date: any;
   logs : Log[];
   selectedLog :Log;
   // service to be injected in constructor
  constructor(private logService : LogService) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
     // subscribe to selected log observable 
     this.logService.selectedSomething.subscribe(log => {
      console.log('hello form' ,log);
       if(log.id !== null){      
             this.selectedLog = log; 
             this.id = log.id;
             this.text =log.text;
             this.date = log.date;
       }
    });
  }
  OnSelect(log: Log){
    this.logService.setFormLog(log);
 } 

 onDelete(log: Log){
  if(confirm('Are you sure?')) {
      this.logService.deleteLog(log);
  }
}

}
