import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  public usuario: Usuario; 
  errores: string[];
  public titulo: string = 'Registrar Usuario'; 

  constructor(private usuarioService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuario = new Usuario; 
  }


  create(): void {
    console.log(this.usuario);
    this.usuarioService.create(this.usuario)
      .subscribe({
        next: (usuario) => {
          this.router.navigate(['/login']);
          Swal.fire('Nuevo cliente', `El usuario ${usuario.username} ha sido creado con éxito`, 'success');
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      }
      );
  }

  volver(): void {
    this.router.navigate(['/login']); 
  }



}
