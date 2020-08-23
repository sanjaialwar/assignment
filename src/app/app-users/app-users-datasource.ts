import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

export interface AppUsersItem {
  name: string;
  mail: string;
  role: string;
  location: string;
  id: number;
}

const DATA: AppUsersItem[] = [
  {id: 1, name: 'Tanmay Shrivastava', mail:'tanmays1@gmail.com', role:'Office Clerk',location:'Pune'},
  {id: 2, name: 'Rakesh Chauhan', mail:'rchauhan31@gmail.com', role:'PR',location:'Chennai'},
  {id: 3, name: 'Vishal Anand', mail:'vand1989@gmail.com', role:'Tech',location:'Pune'},
  {id: 4, name: 'Akash Rajput', mail:'a.rajput101@gmail.com', role:'Designer',location:'Bangalore'},
  {id: 5, name: 'Anand Prakash', mail:'anandp03@gmail.com', role:'Sales Rep',location:'Mumbai'},
  {id: 6, name: 'Avinash Mishra', mail:'avi.mishra8@gmail.com', role:'Tech',location:'Gurgaon'},
  {id: 7, name: 'Sanjeev Kumar', mail:'sanjeev.kumar1@gmail.com', role:'Tech',location:'Kolkata'},
  {id: 8, name: 'Dinesh Shukla', mail:'shukladinesh99@gmail.com', role:'Sales Rep',location:'Pune'},
  {id: 9, name: 'Vikram Singh', mail:'vikrams12@gmail.com', role:'Office Clerk',location:'Mumbai'},
  {id: 10, name: 'Anil Dixit', mail:'dikshit.anil4@gmail.com', role:'Designer',location:'Kolkata'},
  {id: 11, name: 'Nazam Abbas', mail:'nazam.ab1@gmail.com', role:'Sales',location:'Gurgaon'},
  {id: 12, name: 'Amreen Kaur', mail:'amrn.k78@gmail.com', role:'PR',location:'Bangalore'},
  {id: 13, name: 'Akashi Rajput', mail:'akashir2000@gmail.com', role:'Tech',location:'Bangalore'},
  {id: 14, name: 'Sanvi Sharma', mail:'ssharma1992@gmail.com', role:'Designer',location:'Chennai'},
  {id: 15, name: 'Pallavi Andotra', mail:'pallavi.andotra9@gmail.com', role:'Office Clerk',location:'Chennai'},
];

export class AppUsersDataSource extends DataSource<AppUsersItem> {
  data: AppUsersItem[] = DATA;
  paginator: MatPaginator;
  sort: MatSort;
  dataSource = new MatTableDataSource(DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor() {
    super();
  }

  connect(): Observable<AppUsersItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: AppUsersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: AppUsersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'mail': return compare(a.mail, b.mail, isAsc);
        case 'role': return compare(a.role, b.role, isAsc);
        case 'location': return compare(a.role, b.role, isAsc);
        default: return 0;
      }
    });
  }
  
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
