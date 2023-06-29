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
  expressao: string = '';
  expr_Arr: string[] = [''];
  index_Arr = 0;
  resultado: string = '';
  verifica_igual: boolean = false;
  sinais = ['+', '-', '*', '/'];

  criarElemento() {
    this.index_Arr++;
    this.expr_Arr[this.index_Arr] = '';
  }

  adicionar(tecla: string){
    if(tecla == '.' && !Number(this.expr_Arr[this.expr_Arr.length-1])){
      this.expressao += "0";
      this.expr_Arr[this.index_Arr] += "0";
    } else if((tecla == '%' && !Number(this.expr_Arr[this.expr_Arr.length-1]))){
      tecla = '';
    } else if(this.expressao == '' && (this.sinais.includes(tecla) || tecla == "%")){
      tecla = '';
    }

    // Verificando se a duplicidade de sinais é real
    if(this.sinais.includes(tecla) && this.sinais.includes(this.expressao.split('')[this.expressao.length-1])) {
      let array = this.expressao.split('');

      // Substituindo no array e na string o último sinal
      array.splice(array.length-1, 1, tecla);
      this.expr_Arr.splice(this.expr_Arr.length-2, 1, tecla);
      this.expressao = array.join('');
    } else {
      if(tecla == "." && this.expr_Arr[this.index_Arr].includes(".")){
        tecla = '';
      }
      // Adicionando a tecla inserida na string
      if(this.sinais.includes(tecla)){
        this.expressao += ` ${tecla} `;
      } else {
        this.expressao += tecla;
      }
      
      // Caso a tecla seja um número, ou uma vírgula, irá inserir no mesmo index do array
      if(tecla != "%") {
        if(Number(tecla) && this.expr_Arr[this.index_Arr] == "/100"){
          this.expr_Arr[this.index_Arr] += `*${tecla}`;
        } else if(!isNaN(Number(tecla)) || tecla == '.') {
          this.expr_Arr[this.index_Arr] += tecla;
        } else {
          this.index_Arr++;
          this.expr_Arr[this.index_Arr] = ` ${tecla} `;
          this.criarElemento();
        }
      }

      console.log(this.expr_Arr)
      let result = this.expr_Arr.join('');
      this.resultado = eval(result);
    }

    // Porcentagem
    if(tecla == '%') {
      this.index_Arr++;
      this.expr_Arr[this.index_Arr] = "/100";
      console.log(this.expr_Arr)
    } 
  }

  executar(tecla: string){
    if(tecla == "clear") {
      this.expressao = '';
      this.expr_Arr = [''];
      this.index_Arr = 0;

      this.resultado = '';
    }

    if(tecla == "backspace") {
      let array = this.expressao.split('');
      array.pop();
      this.expressao = array.join('');

      let apagar = this.expr_Arr[this.expr_Arr.length-1].split('');
      apagar.pop();
      this.expr_Arr[this.expr_Arr.length-1] = apagar.join('');

      if(this.expr_Arr[this.expr_Arr.length-1] == '') {
        this.expr_Arr.pop();
        this.criarElemento();
      } else if(this.expr_Arr.length == 0){
        this.expr_Arr = [''];
      }
    }

    if(tecla == "change") {
      let item = Number(this.expr_Arr[this.index_Arr]) * -1;
      this.expr_Arr.splice(this.index_Arr, 1, String(item));

      let numerosExpr = this.expressao.split(' ');
      let itemString = `${Number(numerosExpr[numerosExpr.length-1]) * -1}`;

      numerosExpr.splice(numerosExpr.length-1, 1, itemString);

      this.expressao = numerosExpr.join(' ')
    }

  }

  igual() { 
    if(this.expr_Arr.length > 2 && this.expr_Arr[this.expr_Arr.length-1] == "/100") {
      let resultado_porcentagem = '';
      for(let i=0; i<this.expr_Arr.length-3; i++){
        resultado_porcentagem += this.expr_Arr[i];
      }
      this.index_Arr++;
      this.expr_Arr[this.index_Arr] = `*${eval(resultado_porcentagem)}`;
      this.criarElemento();
    }

    let result = this.expr_Arr.join('');
    this.resultado = String(eval(result));
    this.index_Arr = 0;
    
    this.expressao = this.resultado;
    this.expr_Arr = [this.resultado];
    this.criarElemento();

    console.log(this.expr_Arr)
    return this.verifica_igual = true;
  }
}