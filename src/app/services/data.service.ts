import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ITodoItem {
  _id: string;
  text: string;
  done: boolean;
  creation_date: number;
  created_by: string;
  deadline: number;
  __v?: number;
}

export interface IUser {
  _id: string;
  name: string;
  __v?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  apiTodoUrl = 'https://ng-todo-dk.herokuapp.com/api/todo';
  apiUserUrl = 'https://ng-todo-dk.herokuapp.com/api/user';

  fetchData(statusFilter, userFilter) {
    return fetch(`${this.apiTodoUrl}?user=${userFilter}&status=${statusFilter}`)
      .then(response => response.json());
  }

  fetchUsers() {
    return fetch(this.apiUserUrl)
      .then(response => response.json());
  }

  async saveTodo(todo, user) {
    console.log(todo);
    const response = await fetch(`${this.apiTodoUrl}/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        text: todo.text,
        done: todo.done,
        deadline: parseInt(todo.deadline, 0),
      }),
    });
    return response.json();
  }

  async deleteTodo(id, user) {
    const response = await fetch(`${this.apiTodoUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });
    return response.json();
  }

  async createTodo(todo, user) {
    const response = await fetch(this.apiTodoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        text: todo.text,
        deadline: parseInt(todo.deadline, 0),
      }),
    });
    return response.json();
  }
}
