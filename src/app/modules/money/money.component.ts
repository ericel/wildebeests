import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import {Title, Meta} from "@angular/platform-browser";
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({})),
      transition('* => void', [
        style({ height: '*', opacity: 1 }),
        animate(1000, style({ height: 0, opacity: 0 }))
      ]),
      transition('void => *', [
        style({ height: 0, opacity: 0.6 }),
        animate(1000, style({ height: '*', opacity: 1 }))
      ])
    ])
  ]
})
export class MoneyComponent implements OnInit, AfterViewInit {
  displayedColumns = ['Dealer', 'progress', 'id',  'color', 'button'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public nav: NavbarService, private title: Title, private meta: Meta, private router: Router) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

   }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('Send money to Africa, no charges');
    this.meta.addTags([
      { name: 'keywords', content: 'Send money to love ones'},
      { name: 'description', content: 'No charges, No bank charges. Send money to your love ones for free.' }
    ]);


  }
 /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  send($event){
    this.router.navigate(['/money/send/FhBtM70QZKM']);
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    id: id.toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

  
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

