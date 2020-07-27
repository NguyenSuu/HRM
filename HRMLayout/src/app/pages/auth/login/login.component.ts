import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  invalidCredentials: 'Xay ra loi' | 'Tai khoan hoac mat khau khong hop le' | null = null;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value)
    const account:Account = this.validateForm.value;
    this.authService.signIn(account).subscribe(
      () =>{
        this.router.navigate(['/'])
      },
      (err) => {
        if(err.status === 401) {
          this.invalidCredentials = 'Tai khoan hoac mat khau khong hop le'
        } else {
          this.invalidCredentials = 'Xay ra loi'
        }
      }
    )
  }

  constructor(private fb: FormBuilder, private authService:AuthService,
    private router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
