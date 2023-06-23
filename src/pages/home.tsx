import {useEffect, useState} from "react";
import Todo from "../components/Todo.tsx";

interface Props {
  setUserSection: (section: string) => void
}

const Home = ({ setUserSection }: Props) => {
  const userSection = localStorage.getItem('user-section');
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  })
  const onLogout = () => {
    localStorage.setItem('user-section', '');
    setUserSection('');
  }

  const changeBackgroundColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      setTime({
        hour, minute, second,
      })


      changeBackgroundColor();
    }, 1000)

    return () => clearInterval(timer)
  })



  return (
    <div>
      <h1>{userSection}님의 사이트</h1>
      <button onClick={onLogout}>로그아웃</button>
      <h2>{time.hour}:{time.minute}:{time.second}</h2>
      <Todo />
    </div>
  );
};

export default Home;