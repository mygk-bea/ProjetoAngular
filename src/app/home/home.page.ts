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
    var expressao_array = this.expressao.split('');

    // Vericando se a duplicidade de sinais é real
    (!Number(tecla) && !Number(expressao_array[expressao_array.length-2])) ?
    expressao_array.splice(expressao_array.length-2, 2, tecla) : null
    // Substitui o sinal pela última tecla inserida, caso for verídico

    // atualizando a expressão
    this.expressao = expressao_array.join('');

    console.log(expressao_array);

    // PORCENTAGEM
    // DECIMAL
  }

  executar(tecla: string){
    
    if(tecla == "clear") {
      this.expressao = '';
    }

    if(tecla == "backspace") {
      let expressao_array = this.expressao.split('');
      expressao_array.pop();
      this.expressao = expressao_array.join('');
    }

    if(tecla == "change") {
      let expressao_array = this.expressao.split("+");
      let ultimoNumero = Number(expressao_array[expressao_array.length-1]) * -1;

      expressao_array.splice(expressao_array.length-1, 1, `(${ultimoNumero})`);
      
      this.expressao = expressao_array.join('');

      console.log(ultimoNumero)
      console.log(expressao_array)
      
      // atribuir uma variavel como number a : number = expressao_array[expressao_array.lenght -1] * -1
      // substitui o ultimo item do array
      // TERMINAR
    }

    if(tecla == "="){
      this.resultado = eval(this.expressao);
      // atribui resultado a expressao
      // se o valor do proximo item for um numero, substitui o resultado
    }
  }
}
