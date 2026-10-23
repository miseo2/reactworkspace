import { Fragment, useRef, useState } from "react";
import style from "./ArticleApp.module.css";

export default function ArticleApp() {
  const subjectRef = useRef();
  const writerRef = useRef();
  const emailRef = useRef();
  //   const contentRef = useRef();

  const [showWriteForm, setShowWriteForm] = useState(false);
  const [articleList, setArticleList] = useState([
    {
      id: "BO-20260423-000001",
      subject: "TestSubject 1",
      writer: "Admin(admin@gmail.com)",
      view: "1001",
      writeDatetime: "2026-04-23 09:10:11",
    },
    {
      id: "BO-20260423-000002",
      subject: "TestSubject 2",
      writer: "Admin(admin@gmail.com)",
      view: "1",
      writeDatetime: "2026-04-23 09:15:21",
    },
    {
      id: "BO-20260423-000003",
      subject: "TestSubject 3",
      writer: "Admin(admin@gmail.com)",
      view: "67",
      writeDatetime: "2026-04-23 09:18:21",
    },
    {
      id: "BO-20260423-000004",
      subject: "TestSubject 4",
      writer: "Admin(admin@gmail.com)",
      view: "19",
      writeDatetime: "2026-04-23 09:28:51",
    },
  ]);

  const onClickSaveButtonHandler = () => {
    // 사용자가 입력한 제목을 가져온다.
    const subject = subjectRef.current.value;
    // 사용자가 입력한 이름을 가져온다.
    const writer = writerRef.current.value;
    // 사용자가 입력한 이메일을 가져온다.
    const email = emailRef.current.value;
    // 사용자가 입력한 내용을 가져온다.
    // const content = contentRef.current.value;

    // 현재 날짜와 시간 가져오기
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const today = `${year}${month}${day}`;

    const writeDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // 오늘 날짜로 작성된 게시글 중 가장 큰 번호 찾기
    const todayArticles = articleList.filter((article) =>
      article.id.startsWith(`BO-${today}-`),
    );

    const maxNumber = todayArticles.reduce((max, article) => {
      const number = Number(article.id.split("-")[2]);
      return Math.max(max, number);
    }, 0);

    const nextNumber = String(maxNumber + 1).padStart(6, "0");

    // 새로운 게시글 만들기
    const newArticle = {
      id: `BO-${today}-${nextNumber}`,
      subject: subject,
      writer: `${writer}(${email})`,
      view: "0",
      writeDatetime: writeDatetime,
      //   content: content,
    };
    // 기존 게시글 목록에 새로운 게시글 추가
    setArticleList([...articleList, newArticle]);

    // 입력 폼 닫기
    setShowWriteForm(false);
  };
  return (
    <div className={style.articleListGrid}>
      <div>ID</div>
      <div>Subject</div>
      <div>Writer</div>
      <div>View</div>
      <div>Write Datetime</div>
      {articleList.map(({ id, subject, writer, view, writeDatetime }) => (
        <Fragment key={id}>
          <div>{id}</div>
          <div>{subject}</div>
          <div>{writer}</div>
          <div>{view}</div>
          <div>{writeDatetime}</div>
        </Fragment>
      ))}
      {!showWriteForm && (
        <>
          <div className={style.writeButton}>
            <button type="button" onClick={setShowWriteForm.bind(this, true)}>
              글쓰기
            </button>
          </div>
        </>
      )}

      {showWriteForm && (
        <>
          <div className={style.inputGroup}>
            <span>제목</span>
            <input type="text" ref={subjectRef} />
            <span>이름</span>
            <input type="text" ref={writerRef} />
            <span>이메일</span>
            <input type="text" ref={emailRef} />
            <span>내용</span>
            <textarea></textarea>
          </div>
          <div className={style.writeButton}>
            <button type="button" onClick={onClickSaveButtonHandler}>
              저장
            </button>
          </div>
          <div className={style.writeButton}>
            <button type="button" onClick={setShowWriteForm.bind(this, false)}>
              취소
            </button>
          </div>
        </>
      )}
    </div>
  );
}
