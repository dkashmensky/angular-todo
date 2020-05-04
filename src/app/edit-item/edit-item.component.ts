import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService, ITodoItem } from '../services/data.service';
import { IAppApi } from '../app.component';
import { IItemApi } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() appApi: IAppApi;
  @Input() todo: ITodoItem;
  @Input() itemApi: IItemApi;
  editForm;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.editForm = this.formBuilder.group({
      text: '',
      deadline: '',
      deadlineStr: '',
    });
  }

  ngOnInit(): void {
    this.editForm.controls['text'].setValue(this.todo.text);
    this.editForm.controls['deadline'].setValue(this.todo.deadline);
    this.editForm.controls['deadlineStr'].setValue(new Date(this.todo.deadline));
  }

  saveTodo(data) {
    if (this.editForm.valid) {
      if (data.text === this.todo.text
      && data.deadline === this.todo.deadline) {
        return;
      }
      this.appApi.save({
        _id: this.todo._id,
        text: data.text,
        done: this.todo.done,
        creation_date: this.todo.creation_date,
        created_by: this.todo.created_by,
        deadline: data.deadline,
      });
      this.itemApi.closeEditForm();
    }
  }

  closeForm() {
    this.itemApi.closeEditForm();
  }

  dateToTimestamp(event) {
    this.editForm.value.deadline = new Date(event.value).getTime();
  }

}
