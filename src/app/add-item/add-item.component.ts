import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IAppApi } from '../app.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() appApi: IAppApi;
  addForm;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.addForm = this.formBuilder.group({
      text: '',
      deadline: Date.now(),
    });
  }

  ngOnInit(): void {
  }

  createTodo(data) {
    this.appApi.create(data);
  }

  closeForm() {
    this.appApi.closeForm();
  }

}
