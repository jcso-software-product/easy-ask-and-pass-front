import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Cliente } from 'src/app/clientes/cliente';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, 
    private router: Router) { }



    create(usuario: Usuario): Observable<Usuario> {
      return this.http.post(this.urlEndPoint, usuario)
        .pipe(
          map((response: any) => response.usuario as Usuario),
          catchError(e => {
            if (e.status == 400) {
              return throwError(() =>e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(() => e);
          }));
    }
}
