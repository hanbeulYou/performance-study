import React from "react";

import "./index.css";

function zeroPad(value, len) {
  const str = "0000000000" + value.toString();
  return str.substring(str.length - len);
}

/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
function getParametersForUnsplash({ width, height, quality, format }) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
}

/*
 * 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수
 * (Markdown으로 된 문자열의 특수문자를 제거하기 위함)
 * */
function removeSpecialCharacter(str) {
  // const removeCharacters = [
  //   "#",
  //   "_",
  //   "*",
  //   "~",
  //   "&",
  //   ";",
  //   "!",
  //   "[",
  //   "]",
  //   "`",
  //   ">",
  //   "\n",
  //   "=",
  //   "-",
  // ];
  // let _str = str;
  // let i = 0,
  //   j = 0;

  // for (i = 0; i < removeCharacters.length; i++) {
  //   j = 0;
  //   while (j < _str.length) {
  //     if (_str[j] === removeCharacters[i]) {
  //       _str = _str.substring(0, j).concat(_str.substring(j + 1));
  //       continue;
  //     }
  //     j++;
  //   }
  // }

  // 모든 문자열을 검사할 필요 없이 앞에 나오는 내용(약 200자)만 최적화 하면 됨
  // 추가적으로 2중 for문 대신 replace 함수 & 정규식 활용
  let _str = str.substring(0, 300);
  _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\n\=\-]/g, "");

  return _str;
}

function Article(props) {
  const createdTime = new Date(props.createdTime);
  return (
    <div className={"Article"}>
      <div className={"Article__summary"}>
        <div className={"Article__summary__title"}>{props.title}</div>
        <div className={"Article__summary__desc"}>
          {removeSpecialCharacter(props.content)}
        </div>
        <div className={"Article__summary__etc"}>
          {createdTime.getFullYear() +
            "." +
            zeroPad(createdTime.getMonth() + 1, 2) +
            "." +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
      <div className={"Article__thumbnail"}>
        {/* <img src={props.image + getParametersForUnsplash({width: 1200, height: 1200, quality: 80, format: 'jpg'})} alt="thumbnail" /> */}
        {/* 레티나 디스플레이 등 고화질의 디스플레이를 위해 2배 정도의 사이즈 넣기 */}
        <img
          src={
            props.image +
            getParametersForUnsplash({
              width: 240,
              height: 240,
              quality: 80,
              format: "jpg",
            })
          }
          alt="thumbnail"
        />
      </div>
    </div>
  );
}

export default Article;
