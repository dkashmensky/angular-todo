import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ITodoItem {
  _id: string;
  text: string;
  done: boolean;
  completed: boolean;
  creation_date: number;
  created_by: string;
  deadline: number;
  __v?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user = '5eaad944e62fed084b4bc208';

  constructor(private http: HttpClient) { }

  apiTodoUrl = 'http://localhost:8080/api/todo';

  fetchData(id = '') {
    return fetch(this.apiTodoUrl).then(response => response.json());
  }

  async saveTodo(todo) {
    console.log(todo);
    const response = await fetch(`${this.apiTodoUrl}/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.user,
        text: todo.text,
        done: todo.done,
        deadline: todo.deadline,
      }),
    });
    return response.json();
  }

  async deleteTodo(id) {
    const response = await fetch(`${this.apiTodoUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.user,
      }),
    });
    return response.json();
  }

  async createTodo(todo) {
    const response = await fetch(this.apiTodoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.user,
        text: todo.text,
        deadline: todo.deadline,
      }),
    });
    return response.json();
  }
}
