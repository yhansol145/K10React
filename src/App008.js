//해당 문서에서 React의 기능을 사용하기 위해 import 한다.
import React, { Component } from 'react';
import './App.css';

import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'welcome',
            welcome: { title: 'Welcome', desc: 'Hello, React..!!' },
            subject: { title: 'WEB(state)', sub: 'World Wide Web(state)' },
            contents: [
                { id: 1, title: 'HTML', desc: 'HTML은 내용을 출력합니다.' },
                { id: 2, title: 'CSS', desc: 'CSS는 스타일을 지정합니다.' },
                { id: 3, title: 'JavaScript', desc: 'JavaScript는 화면을 동적으로 제어합니다.' }
            ]
        }
    }

    render() {
        let _title, _desc = null;
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.title;
        }
        else if (this.state.mode === 'read') {
            _title = this.state.contents[0].title;
            _desc = this.state.contents[0].title;
        }
        /*
        App 컴포넌트에서 작업했던 부분을 Subject컴포넌트로 옮긴다.
        Subject컴포넌트는 App의 입장에서는 자식이므로 자식에서 부모에게
        명령을 전달하기 위해서는 이벤트를 사용해야 한다.
        onChangePage 라는 props를 ㅌ통해 자식에게 함수를 전달하고,
        Subject에서는 그 함수를 호출하여 부모쪽으로 명령을 전달한다.
        그렇게 state값을 변경하게 된다.
    
        - React의 규칙
        부모 컴포넌트가 자식 컴포넌트에게 명령할때는 props를 통해 전달한다.
        자식이 부모에게 명령할때는 이벤트를 통해 전달한다.
        */
        return (
            <div className="App">
                {/* Hello World..! */}
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        alert('이벤트 확인용(부모)')
                        this.setState({ mode: 'welcome' })
                    }.bind(this)}
                />

                <Navi data={this.state.contents}></Navi>
                <Content title={_title} desc={_desc} />
            </div>
        );
    }
}

export default App;
