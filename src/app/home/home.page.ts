import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})

export class HomePage {
  resultado: number = 0;
  expressao: string = '';

  exibir(tecla: string){
    this.expressao += tecla;
    console.log(this.expressao);
  }

  executar(tecla: string){
    if(tecla == "C") {
      this.expressao = '';
    }

    if(tecla == "+/-") {
      let ultimoItem = this.expressao.split('')[this.expressao.length-1];

      console.log();
    }
  }
}
