import { useState, useEffect } from "react";
import Editor from "./Editor";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import style from "./ModForm.module.css"
import 'bootstrap/dist/css/bootstrap.css';

function Button({ post, setPosts, posts, id }) {
  const Navigate = useNavigate();
  const modPost = async () => {
    try {
      await axios({
        method: "put",
        url: `/api/v1/posts/${id}`,
        data: post
      })
        .then((resp) => {
          console.log(resp.data);
          let copy = [...posts];
          let findIndex = posts.findIndex(post => post.id == id);
          let modPost = ({ id: id, title: resp.data.title, contents: resp.data.contents });
          copy[findIndex] = modPost;
          setPosts(copy);
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="d-flex justify-content-end"
      style={{ width: "800px", height: "40px", margin: "auto", marginTop: "48px", }}>
      <div>
        <Link to={`/post/${post.id}`} state={{ from: post }}>
          <button className={style.custom_btn}
            onClick={modPost}>수정 완료</button>
        </Link>
      </div>
      <button
        className={style.custom_btn}
        onClick={() => {
          Navigate(-1);
        }}>
        수정취소
      </button>
    </div>
  )
}

function Category({ post, setPost }) {
  useEffect(() => {
    setPost(prev => ({ ...prev, category: "자유" }))
  }, [])
  return (
    <div style={{ width: "800px", margin: "auto", marginTop: "10px", marginBottom: "10px" }}>
      <select
        style={{ width: "140px", height: "36px" }}
        className="form-select" aria-label="Default select example"
        defaultValue={"자유"} onChange={(e) => { setPost(prev => ({ ...prev, category: e.target.value })) }}>
        <option key={"라이프"} value={"라이프"}>라이프</option>
        <option key={"스포츠"} value={"스포츠"}>스포츠</option>
        <option key={"연예"} value={"연예"}>연예</option>
        <option key={"자유"} value={"자유"}>자유</option>
      </select>
    </div>
  )
}

function Title({ post, setPost }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p className={style.title_p}>
        <input type="text"
          placeholder="글 제목"
          className={style.title_input}
          value={post.title}
          onChange={(e) => {
            setPost(prev => ({ ...prev, title: e.target.value }))
          }}></input></p>
    </div>
  )
}

export default function ModForm({ setPosts, posts }) {
  const { id } = useParams();

  const [post, setPost] = useState({ id: parseInt(id), title: "", contents: "" })
  return (
    <div className="container mt-4">
      <Category post={post} setPost={setPost}></Category>
      <Title post={post} setPost={setPost}></Title>
      <Editor post={post} setPost={setPost}></Editor>
      <Button post={post} setPosts={setPosts} posts={posts} id={id}></Button>
    </div>
  )
}