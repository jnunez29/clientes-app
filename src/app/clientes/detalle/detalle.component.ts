import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from '../../usuarios/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo:String = "Detalle del cliente";
  private fotoSeleccionada:File;
  progreso: number = 0;

  constructor(private clienteService : ClienteService, 
    private authService: AuthService,
    private modalService: ModalService) { }

  ngOnInit() { }

  seleccionarFoto(event){
    this.progreso = 0;
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal("Error sellecionar imagen: ","El archivo debe ser del tipo imagen","error");
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal("Error Upload: ","Debe seleccionar una foto","error");
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response: any = event.body;
        this.cliente = response.cliente as Cliente;
        this.modalService.notificarUpload.emit(this.cliente); 
        swal("La foto ha sido subida completamente!", response.mensaje,'success'); 
      }     
      
    });
    }
    
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }



}
