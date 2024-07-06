import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.component.html'
})
export class ClientePedidoComponent implements OnInit {

  cliente: Cliente; 

  usuario: Usuario; 

  constructor(private clienteService: ClienteService,
    public authService: AuthService) { }

  ngOnInit(): void {

      this.usuario = this.authService.usuario; 
      console.log('cliente-pedido'); 
      console.log(this.usuario)
      this.clienteService.getClienteId(this.usuario.identificacion)
      .subscribe(cliente => this.cliente = cliente); 

  }

}
