import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../services/utils.service';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private utils: UtilsService) {
  }

  loginForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  ngOnInit(): any {
    this.formInitializer();
  }

  hideShowPassword(): any {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  formInitializer(): any {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  async login(): Promise<any> {
    const formData = this.loginForm.value;
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(res => {
      console.log(res);
      if (res.user.emailVerified) {
        this.saveUser(res.user.uid);
      } else {
        alert('Please verify your email first.');
      }
    }).catch(error => {
      alert(error);
    });
  }

  async saveUser(uid) {
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('uid', JSON.stringify(uid));
    this.router.navigate(['/home']);
  }
}
