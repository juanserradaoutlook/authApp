import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: [ '', [Validators.required]],
    email: [ '', [Validators.required, Validators.email]],
    password: [ '', [Validators.required, Validators.minLength(6)]]
  }) 

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { name, email, password } = this.miFormulario.value

    this.authService.registrar(name, email, password)
    .subscribe( ok => {
      console.log(ok);
      if(ok){
        console.log('1');
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log('2');
        Swal.fire('Error', ok, 'error');
      }
            
    })


  }



}
