import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    // We create the form on our own, and we got access to it here.
    // We don't configure the form in the template, we only synchronize it with directives, formControlName and formGroup, we configure it here in the TS code.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        // 1st argument: default value, 2nd arg: validators, 3rd arg: async validators.
        // We need to bind custom validators if we plan on using this in the template.
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('other'),
      'hobbies': new FormArray([])
    })

    // Racting to Status or Value Changes:
    // On each control of this form we have two observables we can listen to: statusChanges and valueChanges.
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    )

    // Setting and Patching Values:
    this.signupForm.setValue({
      'userData': {
        'username': 'Laia',
        'email': 'laia@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Alice'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    // Explicitly cast FormArray to make this work.
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Return type {[s: string]} means we want to have a key-value pair where the key can be interpreted as a string and the value of that key-value pair should be a boolean.
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    // If validation is successful, we have to pass null or simply omit the return statement. This is how you tell Angular that the FormControl is valid.
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
