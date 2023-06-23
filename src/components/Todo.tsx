/* eslint-disable */
import {ChangeEventHandler, FormEventHandler, useEffect, useState} from "react";
import axios from "axios";

const Todo = () => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<{ text: string, checked: boolean }[]>(() => JSON.parse(localStorage.getItem('todos') || '[]'))
  const [city, setCity] = useState('서울')
  const [Temperatures, setTemperatures] = useState(27)

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!input || input.trim() === '') {
      return;
    }

    setTodos(prev => [...prev, { text: input, checked: false }])
    setInput('')
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  }

  const onSaveLocalstorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const onToggle = (idx: number) => {
    const newTodos = todos.map((todo, index) => index === idx ? { ...todo, checked: !todo.checked} : todo);
    setTodos(newTodos)
  }

  const onRemove = (idx: number) => {
    const newTodos = todos.filter((_todo, index) => index !== idx);
    setTodos(newTodos)
  }

  const onGeoOk = async (position: GeolocationPosition) => {
    console.log(position);
    const { latitude: lat, longitude: lon } = position.coords;

    try {
      const API_KEY = `92cbd20cf31d4cba5384537c6d9f36f2`
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      console.log(res)
      // const name = res.name;
      // const weather = res.weather[0].main;
      setCity('서울')
      setTemperatures(27)
    } catch (e) {
      console.error(e)
    }
  }

  const onGeoError = () => {
    console.log(444);


  }

  useEffect(() => {
    onSaveLocalstorage();
  }, [onSaveLocalstorage, todos])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, [])


  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="todo input" value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <ul>
        {todos?.map((todo, idx) => <li key={idx}>
          <span style={{ textDecoration: todo.checked ? 'line-through' : 'none'}}>{todo.text}</span>
          <button onClick={() => onToggle(idx)}>완료</button>
          <button onClick={() => onRemove(idx)}>삭제</button>
        </li>)}
      </ul>
      <h2>{city} 현재 온도: {Temperatures}</h2>
    </div>
  );
};

export default Todo;