import { Injectable,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();
  
  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }
  
  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
