import React, { Component } from "react";

class Subject extends Component {
    render() {
        /*
        Subject컴포넌트를 렌더링 시 속성으로 추가한 내용을
        props로 얻어와서 적용한다.
        */
        return (
            <header>
                <h1>{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}

/*
해당 컴포넌트를 다른 파일에서 import할때에는 aSubject라는 이름으로 사용하면 된다.
*/
export default Subject;