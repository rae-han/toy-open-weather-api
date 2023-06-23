import React, {ChangeEventHandler, FormEventHandler, useState} from 'react';

interface Props {
  setUserSection: React.Dispatch<React.SetStateAction<string | null>>
}

const Login = ({ setUserSection }: Props ) => {
  const [name, setName] = useState('기본유저')

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    localStorage.setItem('user-section', name)
    setUserSection(name)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="이름" value={name} onChange={onChange} />
        <br />
        <button type="submit">이름으로 로그인하기</button>

      </form>
    </div>
  );
};

export default Login;