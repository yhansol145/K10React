/*
Hook(훅)
  : 리액트 기존 버전에서는 간단한 기능을 제작할때만 함수를 사용했다.
  state를 변경하는것은 클래스형 컴포넌트에서만 가능했었지만,
  16.8버전부터 Hook을 통해 함수형 컴포넌트에서도 state값을
  변경할 수 있게 되었다. 리액트 훅은 useXXX()와 같은 이름을 가진다.
  사용하기 위해서는 반드시 import처리 해야한다.

  useState : state를 변경하기 위한 훅
  useEffect : 라이프사이클을 사용하기 위한 훅
*/
import React, {useState, useEffect} from 'react';
import './App.css';

/*
아래에서 생성한 함수형/클래스형 컴포넌트를 화면에 출력하기 위해
<컴포넌트명> 과 같은 태그 형태로 사용한다.
*/
function App() {

  /*
  useState()의 첫번째와 두번째 인자는 각각 변수와 함수이고,
  해당 변수가 변수의값을 변경할 수 있으므로 아래 2개의 hook은
  두 변수가 가진 true를 false로 변경할 수 있다.
  */
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Class VS Function 스타일 컴포넌트</h1>
      <input type="button" value="함수형컴포넌트삭제" onClick={
        function(){
          setFuncShow(false);
        }
      } />

      <input type="button" value="클래스형컴포넌트삭제" onClick={
        function(){
          setClassShow(false);
        }
      } />
      {funcShow ? <FuncComponent initNumber={2}></FuncComponent> : null}
      {classShow ? <ClassComponent initNumber={2}></ClassComponent> : null}
      {/*  
        부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할때는
        props를 사용한다. HTML속성과 같이 사용하는 특징이 있다.
      */}

      {/* 아래 각 변수가 false가 되면 삼항연산자에 의해 컴포넌트는 숨김처리 된다. */}
      <FuncComponent initNumber={2}></FuncComponent>
      <ClassComponent initNumber={2}></ClassComponent>
    </div>
  );
}

/*
함수형 컴포넌트
  : 출력할 내용을 즉시 return하면 된다. 함수안에 또다른 함수를 
  사용할 수 없으므로 render()함수가 별도로 존재하지 않고, 
  자기 자신이 render() 역할을 한다.

  부모컴포넌트에서 props로 전달한 데이터를 받을 때 매개변수를
  사용한다. 매개변수이므로 이름은 props가 아닌 다른 이름을 사용해도
  된다.
*/
function FuncComponent(props){
  //return전에 특정 함수를 호출하는 것으로 전처리를 할 수 있다.
  console.log('#Life#', 'FuncComponent ==> 함수실행');
  /*
  useState()로 얻어온 값을 출력하면 크기가 2인 배열로 출력된다.
  0번째 요소는 인자로 전달한 값(상태값)이고,
  1번째 요소는 state값을 변경할 수 있는 함수이다.
  */
var numberState = useState(props.initNumber);
console.log("numberState", numberState);
var number = numberState[0]; //값
var setNumber = numberState[1]; //함수

//var dateState = useState((new Date()).toString());
//var nowDate = dateState[0]; //값
//var setDate = dateState[1]; //함수
//==>> 반환값이 배열이므로 위 코드를 아래와 같이 변경할 수 있다.
var [nowDate, setDate] = useState((new Date()).toString());

/*
useEffect의 첫번째 인자는 함수가 와야한다. render()가 호출된 후
자동으로 실행된다.
*/
useEffect(function(){
  console.log('#Life#', 'FuncComponent==>useEffect');
});

//함수형 컴포넌트에서는 return이 render()의 역할을 하게된다.
console.log('#Life#', 'FuncComponent==>return실행(render와동일)');

  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>날짜 : {nowDate}</p>
      {/* setState()로 전달된 2번째 인자를 setNumber라는 함수명으로
      받았으므로 해당 버튼의 이벤트 처리에서 사용할 수 있다. 
      버튼 클릭시 number값을 생성된 난수로 변경하게 된다.*/}
      <input type="button" value="난수생성" onClick={function(){
        setNumber(Math.random());
      }} />
      {/* 함수형 컴포넌트에서는 state값을 변경하기 위해 this를 사용할 필요가
      없으므로 어떤 형식의 함수를 사용해도 상관없다. */}
      <input type="button" value="현재날짜" onClick={function(){
        setDate((new Date()).toString());
      }} />
    </div>
  );
}

/*
클래스형 컴포넌트
  : React.Component를 상속하여 선언한다. 수명주기 함수중에
  render()함수를 통해 렌더링 하므로 필수적으로 선언해야 한다.

  부모컴포넌트에서 전달한 props를 받을때에는 'this.props.속성명'
  으로 출력한다.
*/
class ClassComponent extends React.Component{
  //클래스형 컴포넌트에서 state는 JSON으로 생성한다.
  state = {
    number : this.props.initNumber,
    nowDate : (new Date()).toString()
  }
  //render()가 호출되기전에 자동 호출된다.
  UNSAFE_componentWillMount(){
    console.error("ClassComponent => componentWillmount() 호출됨");
  }
  //render()가 호출된 이후에 자동 호출된다.
  componentDidMount(){
    /*
    해당 함수는 17버전 이상에서 사용할때는 UNSAFE_를 붙이지 않으면
    경고메세지가 뜨게된다.
    */
    console.error("ClassComponent => componentDidMount() 호출됨");
  }
  /*
  최초로 랜더링될때는 호출되지 않고, state값 변경에 의한 재 랜더링이
  될 때 호출된다. 해당 함수에서 true가 호출될때만 render()를 호출할 수 있다.
  만약 false가 반환되면  render()가 호출되지 않아 화면이 갱신되지 않는다.
  */
  shouldComponentUpdate(){
    console.error("ClassComponent => shouldComponentUpdate() 호출됨");
    let rNum = Math.round(this.state.number*100) % 2;
    if(rNum==0){
      return true;
    }
    else{
      console.log("홀수는 랜더링 안됨");
      return false;
    }
  }
  render(){
    return(
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>날짜 : {this.state.nowDate}</p>
        {/* 클래스형 컴포넌트에서는 setState()를 통해 state값을
        변경할 수 있다. */}
        <input type="button" value="난수생성" onClick={()=>{
          this.setState({number : Math.random()});
        }} />
        {/* function()을 사용할 경우 컴포넌트와의 바인딩을 위해 bind()함수를
        사용해야 하지만, 화살표함수(Arrow Function)를 사용하면 별도의 바인딩을
        하지 않아도 된다.  */}

        <input type="button" value="현재날짜" onClick={
          ()=>{
            this.setState({nowDate : (new Date()).toString()});
          }
        } />
      </div>
    );
  }
}

export default App;
