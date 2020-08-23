import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-dash',
  templateUrl: './app-dash.component.html',
  styleUrls: ['./app-dash.component.css']
})
export class AppDashComponent implements OnInit {

  cards = [];

  constructor(private breakpointObserver: BreakpointObserver, private interactionService:InteractionService) {}

  roles = ['HR','CLERK','TECH','DESIGNER'];
  totalCount = 0;

  ngOnInit() {
    this.interactionService.data$.subscribe(data => {
      let hrCount = 0;
      let clerkCount = 0;
      let designerCount = 0;
      let techCount = 0;
        data.map(item => {
          if(item.role.toLowerCase() === "hr") {
            hrCount++;
          } else if(item.role.toLowerCase() === "clerk") {
            clerkCount++;
          } else if(item.role.toLowerCase() === "tech") {
            techCount++;
          } else if(item.role.toLowerCase() === "designer") {
            designerCount++;
          }
        });
        this.totalCount = hrCount+clerkCount+techCount+designerCount;
        this.roles.map(item => {
          let obj = {};
          obj['title'] = item;
          obj['cols'] = 1;
          obj['rows'] = 1;
          if(item === "HR") {
            obj['count'] = hrCount;
          } else if(item === "CLERK") {
            obj['count'] = clerkCount;
          } else if(item === "DESIGNER") {
            obj['count'] = designerCount;
          } else if(item === "TECH") {
            obj['count'] = techCount;
          }
          this.cards.push(obj);
        });
    });
  }
}
