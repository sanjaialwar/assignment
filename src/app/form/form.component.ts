import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public data = [];
  usersForm: FormGroup;
  name1: FormControl;
  role1: FormControl;
  email1: FormControl;
  location1: FormControl;
  submitted: boolean = false;

  ngOnInit() {
    this.name1 = new FormControl('', Validators.required);
    this.role1 = new FormControl('', Validators.required);
    this.email1 = new FormControl('', (Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")));
    this.location1 = new FormControl('', Validators.required);

    this.usersForm = new FormGroup({
      name: this.name1,
      role: this.role1,
      email: this.email1,
      location: this.location1,

    });
  }

  get email() {
    return this.usersForm.get('email')
  }
  get name() {
    return this.usersForm.get('name')
  }
  get role() {
    return this.usersForm.get('role');
  }
  get location() {
    return this.usersForm.get('location');
  }

  constructor(private interactionService: InteractionService) { }

  onSubmit() {
    this.submitted = true;
    this.data = (this.usersForm.value);
    this.usersForm.reset(this.usersForm.value);

    let obj = {};
    obj["id"] = Math.floor((Math.random() * 1000000) + 1);
    obj["name"] = this.data["name"];
    obj["role"] = this.data["role"];
    obj["mail"] = this.data["email"];
    obj["location"] = this.data["location"];
    this.data = [];
    this.interactionService.data$.subscribe(data => {
      if (data.indexOf(obj) === -1) {
        data.push(obj);
      }
      this.data = data;
    });
    this.interactionService.data.next(this.data);
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }
}
