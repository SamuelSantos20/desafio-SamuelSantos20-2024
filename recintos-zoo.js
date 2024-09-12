class RecintosZoo {
 constructor(){

    this.recintos = [
      {numero: 1 ,bioma: 'savana' , tamanhoTotal:10 , animais : [{especie:'MACACO' , quantidade: 3}] },
      {numero: 2  , bioma : 'floresta' , tamanhoTotal: 5 , animais:[]},
      {numero: 3 , bioma:'savana e rio' , tamanhoTotal: 7 , animais: [{especie:'GAZELA' , quantidade:1}]},
      {numero: 4 , bioma: 'rio' , tamanhoTotal: 8, animais:[]},
      {numero: 5 , bioma: 'savana' , tamanhoTotal:9 , animais: [{especie: 'LEAO' , quantidade:1}]}
    ];

    this.animais = {
        LEAO:{tamanho: 3 , biomas:['savana'] , carnivoro: true},

        LEOPARDO:{tamanho: 2 , biomas:['rios'] , carnivoro:true},
        
        CROCODILO: {tamanho: 2 , biomas:['savana'] , carnivoro:true},

        MACACO: {tamanho:3 , biomas:['savana'] , carnivoro:false},

        GAZELA: {tamanho:2 , biomas:['savana'] , carnivoro:false},

        HIPOPOTAMO: {tamanho:4 , biomas:['savana' , 'rio'] , carnivoro:false}




    };


  }
  analisaRecintos(animal, quantidade){

      if(!this.animais[animal]){
        
        return{erro:'animal Invalido'};

        }
      if(quantidade<=0){
        return {erro:'quantidade invalida'};
      }
         const animalDat = this.animais[animal]
         const tamanhoTotalAnimal = this.animalDat.tamanho * quantidade;
        let recintosViaveis = [];

        for(let recinto of this.recintos){

          const espacoOcupado = recinto.animais.reduce((total , animal) => total + (this.animais[animal.especie].tamanho * animal.quantidade) , 0);
          let espacoRestante = recinto.tamanhoTotal - espacoOcupado;
          
          if(animalDat.biomas.includes(recinto.bioma)){
                  if(espacoRestante >= tamanhoTotalAnimal && this.verificarCompatiblidade(recinto ,animal,quantidade )){
                          recintosViaveis.push('Recinto ${recinto.numero} (esapaço livre : ${espacoRestante - tamanhoTotalAnimal }) total:${recinto.tamanhoTotal}')


                  }


          }

        }
         if(recintosViaveis.length === 0){

          return{ erro:'Não há recinto viável'};
         }

         return{recintosViaveis};
 
      }
       verificarCompatiblidade(recinto , novoAnimal , quantidade){
          const carnivorosNoRacinto = recinto.animais.some( a => this.animais[a.especie].carnivoro);
          const novoAnimalCarnivoro = this.animais[novoAnimal].carnivoro;

          if(carnivorosNoRacinto && novoAnimalCarnivoro){
            return recinto.animais.every(a => a.especie === novoAnimal); 

          }

          return true;


       }

    }
    
export { RecintosZoo as RecintosZoo };
