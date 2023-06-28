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
  expressao_array: string[] = [''];
  indice_array: number = 0;
  verifica_igual: boolean = false;

  adicionar(tecla: string){
    if(!isNaN(Number(tecla)) || tecla == ',') {
      this.expressao_array[this.indice_array] += tecla;
    } else {
      this.indice_array++;
      this.expressao_array[this.indice_array] = tecla;
    }

    // Vericando se a duplicidade de sinais é real
    if(!Number(tecla) && !Number(this.expressao_array[this.expressao_array.length-2])){
      this.expressao_array.splice(this.expressao_array.length-2, 2, tecla);
      // Substitui o sinal pela última tecla inserida, caso for verídico
      this.indice_array--;
    }

    console.log(this.expressao_array);

    // if(typeof Number(tecla) === "number" && this.verifica_igual){
    //   this.resultado = Number(tecla);
    //   this.expressao_array = [tecla];
    //   this.verifica_igual = false;
    // }

    // PORCENTAGEM
    // DECIMAL
  }

  executar(tecla: string){
    
    if(tecla == "clear") {
      this.expressao_array = [''];
      this.indice_array = 0;
    }

    if(tecla == "backspace") {
      this.expressao_array.pop();
      this.indice_array--;
      console.log(this.expressao_array)
    }

    if(tecla == "change") {
      let ultimoNumero = Number(this.expressao_array[this.indice_array]) * -1;

      this.expressao_array.splice(this.indice_array, 1, `${ultimoNumero}`);
      
      console.log(ultimoNumero)
      console.log(this.expressao_array)
      
      // atribuir uma variavel como number a : number = expressao_array[expressao_array.lenght -1] * -1
      // substitui o ultimo item do array
      // TERMINAR
    }

  }

  igual() { 
    let expressao = this.expressao_array.join('');
    this.resultado = eval(expressao);
    this.indice_array = 0;
    this.expressao_array = [String(this.resultado)];
    this.indice_array++;
    return this.verifica_igual = true;
  }
}
