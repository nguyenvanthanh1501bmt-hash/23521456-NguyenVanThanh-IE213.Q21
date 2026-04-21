import React, { useState } from 'react';

function Login(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const login = () => {
    props.login({ name: name, id: id });
    props.history.push('/');
  }

  return (
    <div className="container mt-3">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username</label>
        <input 
          type="text" 
          className="form-control" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <button onClick={login} className="btn btn-success mt-2">
        Login
      </button>
    </div>
  );
}

export default Login;