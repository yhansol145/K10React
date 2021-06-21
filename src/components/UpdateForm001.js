import React, { Component } from "react";

//게시물 수정을 위한 수정폼
class UpdateForm extends Component {
    render() {
        return (
            <article>
                <h2>Update</h2>
                {/* 서브밋 이벤트 리스너에서 이벤트 객체를 통해 입력한 값을 전송한다. */}
                <form action="/create_process" method="post" onSubmit={function (e) {
                    e.preventDefault();
                    this.props.onSubmitValue(
                        e.target.id.value,
                        e.target.title.value,
                        e.target.desc.value
                    );
                }.bind(this)}>
                    {/* 기존 게시물에 대한 수정이므로 게시물 아이디를 저장할 Hidden상자 필요 */}
                    {/* 
                    App.js에서 기존 게시물을 읽어온 후 props를 통해 전달한 데이터를
                    각 input상자에 삽입한다. 하지만 값을 수정하는 것은 불가능하다.
                    props는 읽기전용이므로 값에 대한 수정을 하려면 state를 통해서만 가능하다.
                    */}
                    <input type="hid-den" name="id" value={this.props.readData.id} />
                    <p><input type="text" name="title" placeholder="제목입력"
                        value={this.props.readData.title} /></p>
                    <p><textarea name="desc" placeholder="내용입력"
                        value={this.props.readData.desc}></textarea></p>
                    <p><input type="submit" value="전송" /></p>
                </form>
            </article>
        );
    }
}

export default UpdateForm;