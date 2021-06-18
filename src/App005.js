//해당 문서에서 React의 기능을 사용하기 위해 import 한다.
import React, { Component } from 'react';
import './App.css';

/*
외부 js파일로 모듈화한 컴포넌트를 해당 문서로 import하기 위한
구문으로, export default로 지정한 이름을 그대로 사용하면 된다.

형식]
  import 변수로 사용할 이름 from '컴포넌트 경로'
*/
import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';


/* 클래스명 컴포넌트(해당 실습에서 사용) */
class App extends Component {
    //state를 추가하기 위해 생성자를 정의한다.
    constructor(props) {
        super(props);
        //state를 생성 및 초기화한다.
        this.state = {
            subject: { title: 'WEB(state)', sub: 'World Wide Web(state)' },
            contents: [
                { id: 1, title: 'HTML', desc: 'HTML은 내용을 출력합니다.' },
                { id: 2, title: 'CSS', desc: 'CSS는 스타일을 지정합니다.' },
                { id: 3, title: 'JavaScript', desc: 'JavaScript는 화면을 동적으로 제어합니다.' }
            ]
        }
    }

    /*
    Navi컴포넌트에 반복되는 링크를 for문으로 처리하기 위해
    state에 contents 항목을 추가한다. 객체 3개를 저장한 배열의 형태이다.
    Navi컴포넌트로 props를 통해 전달한다.
    */
    render() {
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub} />
                <Navi data={this.state.contents}></Navi>
                <Content title="HTML(props)" desc="HTML is HyperText Markup Language(props)" />
            </div>
        );
    }
}

export default App;
