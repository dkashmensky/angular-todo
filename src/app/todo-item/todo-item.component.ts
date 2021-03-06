import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem } from '../services/data.service';
import { IAppApi } from '../app.component';

export interface IItemApi {
  closeEditForm: () => void;
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodoItem;
  @Input() appApi: IAppApi;
  @Input() userId: string;

  showEditForm = false;

  constructor() { }

  save(todo) {
    this.appApi.save(todo);
  }

  delete(id) {
    this.appApi.delete(id);
  }

  closeEditForm() {
    this.showEditForm = false;
  }

  showTodoDetails(todo) {
    this.appApi.setTodoDetails(todo);
  }

  getItemApi() {
    return {
      closeEditForm: () => {
        this.closeEditForm();
      },
    };
  }

  ngOnInit(): void {

  }

}
