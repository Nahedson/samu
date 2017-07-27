import { Component, OnInit } from '@angular/core';

import {UF} from './types/uf';
import {UFService} from './services/uf.service'

import {Dados} from './types/samu';
import {SamuService} from './services/samu.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UFService, SamuService]
})
export class AppComponent implements OnInit {

    ufs : UF[];
    dados_da_samu : Dados[];
    constructor(private ufService: UFService, private samuService: SamuService)
    { }

    ngOnInit(): void {
        this.ufs = this.ufService.getAll();
        this.dados_da_samu = this.samuService.getAllMunicipiosAtendidosPorEstado();
        this.defineTitle();
        this.defineArea();
        this.defineMedia();
    }
    meu_estado_id = 32;
    title = undefined;
    defineTitle() : void {
      for(let uf of this.ufs){
        if(uf.id === 32) this.title = uf.nome;
      }
    }
    meu_estado_area = undefined;
    defineArea() : void {
      for(let uf of this.ufs){
        if(uf.id === 32) this.meu_estado_area = uf.area;
      }
    }
    meu_estado_media = 0;
    i_media = 0;
    soma_municipios = 0;
    defineMedia() : void {
      for(let VALORES of this.dados_da_samu){
        if(VALORES.uf_id === 32) {
          this.soma_municipios += VALORES.valor;
          this.i_media++;
        }
      }
      this.meu_estado_media = this.soma_municipios/this.i_media;
    }

    dados = [];
    defineDados() : void {
      for(let VALORES of this.dados_da_samu){
        if(VALORES.uf_id === 32) {
         this.dados.push(VALORES);
        }
      }
      // this.dados = this.dados_da_samu
      //   .filter((item) => item.uf_id == 32);
    }

}
