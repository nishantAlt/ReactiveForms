import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor() { 
    this.employeeForm=new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),

      skills: new FormGroup(
        {
          skillName: new FormControl(),
          experienceInYears: new FormControl(),
          proficiency: new FormControl()
        }
      )
    })
  }

  ngOnInit(): void {}

  onLoadDataClick() : void
  {
    this.employeeForm.setValue({
      fullName: "Nishant Badlani",
      email: "nishant@gmail.com",
      skills:{
        skillName: "C#",
        experienceInYears: "0.5",
        proficiency: "beginner"
      }
    })
  }

  onSubmit()
  {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls['fullName'].value);
  }
}
