import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength=0;
  constructor(private fb:FormBuilder) { 
    this.employeeForm=this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
      })
    })
  }

  ngOnInit(): void {
    this.employeeForm.controls['fullName'].valueChanges.subscribe(
      (value:string)=>this.fullNameLength=value.length
    )
  }   
    // this.employeeForm.valueChanges.subscribe((value:any)=>{
    //   console.log(JSON.stringify(value));
    // })
    // this.employeeForm.get('skills')?.valueChanges.subscribe((value:any)=>{
    //   console.log(JSON.stringify(value));
    // })
  

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
