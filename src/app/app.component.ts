import { Component, OnInit } from '@angular/core';
import { DataService, ITodoItem, IUser } from './services/data.service';

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
  users: IUser[];
  showAddForm = false;
  todoObject: ITodoItem = {
    _id: '',
    text: '',
    done: false,
    creation_date: 0,
    created_by: '',
    deadline: 0,
  };
  statusFilter: string | boolean = 'all';
  userFilter = 'all';
  currentUserId = '';
  sort = '';

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

  sortTodo() {
    switch (this.sort) {
      case 'dead-asc':
        this.data.sort((a, b) => a.deadline - b.deadline);
        break;
      case 'dead-desc':
        this.data.sort((a, b) => b.deadline - a.deadline);
        break;
      case 'create-asc':
        this.data.sort((a, b) => a.creation_date - b.creation_date);
        break;
      case 'create-desc':
        this.data.sort((a, b) => b.creation_date - a.creation_date);
        break;
      default:
        this.get();
        break;
    }
  }

  get() {
    this.dataService.fetchData(this.statusFilter, this.userFilter).then(json => {
      this.data = json.todos;
    });
  }

  getUsers() {
    this.dataService.fetchUsers().then(json => {
      this.users = json.users;
      this.currentUserId = json.users[0]._id;
    });
  }

  create(todo) {
    this.dataService.createTodo(todo, this.currentUserId).then(response => {
      console.log(response);
      this.showAddForm = false;
      this.get();
    });
  }

  save(todo) {
    this.dataService.saveTodo(todo, this.currentUserId).then(response => console.log(response)).then(response => this.get());
  }

  delete(id) {
    this.dataService.deleteTodo(id, this.currentUserId).then(response => {
      console.log(response);
      this.get();
    });
  }

  closeForm() {
    this.showAddForm = false;
  }

  ngOnInit() {
    this.get();
    this.getUsers();
  }
}
