import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns = ['id', 'name', 'mail', 'role', 'location'];
  dataSource: MatTableDataSource<UserData>;
  userData = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public data = [];

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.userData = [];
    this.interactionService.data$.subscribe(data => {
      data.map(item => {
        if (this.userData.indexOf(item) === -1) {
          this.userData.push(item);
        }
      });
    });
    this.dataSource = new MatTableDataSource(this.userData);
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.location.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface UserData {
  id: number;
  name: string;
  mail: string;
  role: string;
  location: string;
}

