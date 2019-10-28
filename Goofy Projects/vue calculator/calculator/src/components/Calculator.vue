<template>
  <div class="calculator">
    <div class="display">{{current || '0'}}</div>
    <div @click="clear" class="btn">c</div>
    <div @click="sign" class="btn">+ / -</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click="append(7)" class="btn ">7</div>
    <div @click="append(8)" class="btn">8</div>
    <div @click="append(9)" class="btn">9</div>
    <div @click="multiply" class="btn operator">x</div>
    <div @click="append(4)" class="btn">4</div>
    <div @click="append(5)" class="btn">5</div>
    <div @click="append(6)" class="btn">6</div>
    <div @click="minus" class="btn operator">-</div>
    <div @click="append(1)" class="btn">1</div>
    <div @click="append(2)" class="btn">2</div>
    <div @click="append(3)" class="btn">3</div>
    <div @click="sum" class="btn operator">+</div>
    <div @click="append(0)" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      current:'',
      previous:null,
      operator:null,
      operatorClicked:false
    }
  },
  methods:{
    clear(){
      this.current = ''
    },
    sign(){
      //? Slice: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      //? charAt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
      // TODO When we have a 0 make sure this conditional is not true
      if(this.current !== ''){
        this.current = this.current.charAt(0) === '-' ? this.current.slice(1) : `-${this.current}`
      }
    },
    percent(){
      this.current = `${parseFloat(this.current / 100)}`;
    },
    append(number){
      if (this.operatorClicked) {
        this.current = ''
        this.operatorClicked = false
      }
      this.current = `${this.current}${number}`;
    },
    dot(){
      //? indexOF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
      //* If value doesn't exists, the function return -1.
      if(this.current.indexOf('.') === -1){
        this.append('.')
      }
    },
    setPrevious(){
      this.previous = this.current
      this.operatorClicked = true
    },
    divide(){
      this.operator = (a,b) => a / b
      this.setPrevious()
    },
    multiply(){
      this.operator = (a,b) => a * b
      this.setPrevious()
    },
    minus(){
      this.operator = (a,b) => a - b
      this.setPrevious()
    },
    sum(){
      this.operator = (a,b) => a + b
      this.setPrevious()
    },
    equal(){
      this.current = `${this.operator(
          parseFloat(this.previous), 
          parseFloat(this.current)
        )}`
        this.previous = ''
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculator {
  width: 400px;
  margin: 0 auto;
  font-size: 40px;
  display: grid;
  /* //? Defines the grid template*/
  grid-template-columns: repeat(4, 1fr);
  /* //? Colum sizing */
  grid-auto-rows: minmax(50px, auto);
  box-shadow: 0px 0px 7px 4px rgba(0,0,0,0.48);
}
.display {
  /* //? Set the display colum with a span from colum 1 and colum */
  grid-column: 1 / 5;
  background-color: #2f3640;
  color: #f5f6fa;
}
.zero{
  grid-column: 1 / 3;
}
.btn{
  cursor: pointer;
  background-color: #ecf0f1;
  border: 0.1px solid #718093;
}
.btn:active{
  transform: scale(0.95)
}
.operator{
 background-color: #f39c12;
 color: #ecf0f1;
}
</style>
