import { Component, OnInit } from '@angular/core';
import { DataService, ITodoItem } from './services/data.service';

export interface IAppApi {
  save: (ITodoItem) => void;
  delete: (string) => void;
  create: (object) => void;
  closeForm: () => void;
  openForm: (ITodoItem) => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  data: ITodoItem[];
  showAddForm = false;
  todoObject: ITodoItem = {
    _id: '',
    text: '',
    done: false,
    completed: false,
    creation_date: 0,
    created_by: '',
    deadline: 0,
  };

  constructor(private dataService: DataService) { }

  getAppApi() {
    return {
      save: (todo) => {
        this.save(todo);
      },
      delete: (id) => {
        this.delete(id);
      },
      create: (todo) => {
        this.create(todo);
      },
      closeForm: () => {
        this.closeForm();
      },
    };
  }

  get() {
    this.dataService.fetchData().then(json => {
      this.data = json.todos;
    });
  }

  create(todo) {
    this.dataService.createTodo(todo).then(response => {
      console.log(response);
      this.showAddForm = false;
      this.get();
    });
  }

  save(todo) {
    this.dataService.saveTodo(todo).then(response => console.log(response));
  }

  delete(id) {
    this.dataService.deleteTodo(id).then(response => {
      console.log(response);
      this.get();
    });
  }

  closeForm() {
    this.showAddForm = false;
  }

  log(item) {
    console.log(item);
  }

  ngOnInit() {
    this.get();
  }
}
