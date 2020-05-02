import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem } from '../services/data.service';
import { IAppApi } from '../app.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodoItem;
  @Input() appApi: IAppApi;

  constructor() { }

  save(todo) {
    this.appApi.save(todo);
  }

  delete(id) {
    this.appApi.delete(id);
  }

  ngOnInit(): void {

  }

}
