import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem, IUser } from '../services/data.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  @Input() todo: ITodoItem | undefined;
  @Input() users: IUser[];

  constructor() { }

  ngOnInit(): void {
  }

  timestampToString(time) {
    return new Date(time).toLocaleDateString();
  }

  getUserName(id, usersArray) {
    return usersArray.find(user => user._id === id).name;
  }

}
