import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });
  
      console.log('Login response:', response.data); // Log the response data
  
      if (response.data.token) {
        console.log(response);
        
        const { token } = response.data;
        const { id } = response.data.user; // Assuming userId is returned within the user object
        
        // Store the token and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        console.log(token);
        console.log(id);
        console.log(localStorage);
  
        // Notify the parent component that login was successful
        onLogin();
  
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error', error); // Log the full error
      alert('Login error');
    }
  };
  



  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5001/api/auth/login', {
  //       email,
  //       password
  //     });

  //     if (response.data.token) {
  //       const { token } = response.data;
  //       const { userId } = response.data.user; // Assuming userId is returned within the user object

  //       // Store the token and userId in localStorage
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('userId', userId);

  //       // Notify the parent component that login was successful
  //       onLogin();

  //     } else {
  //       alert('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Login error', error);
  //     alert('Login error');
  //   }
  // };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f4f4f4;
// `;

// const Form = styled.form`
//   background-color: white;
//   padding: 40px;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 300px;
// `;

// const Title = styled.h2`
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #18BC9C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #16a085;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   margin-top: 10px;
// `;

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');


// // Assuming you have some login function that returns the userId
// // const handleLogin = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:5001/api/login', {
// //         username,
// //         password
// //       });
      
// //       if (response.data.success) {
// //         const { userId } = response.data; // Extract the userId from the response
// //         localStorage.setItem('userId', userId); // Store userId in localStorage
// //         onLogin(); // Call the parent component's login handler
// //       } else {
// //         alert('Login failed');
// //       }
// //     } catch (error) {
// //       console.error('Login error', error);
// //       alert('Login error');
// //     }
// //   };
  



//     const handleLogin = (e) => {
//     e.preventDefault();

// //     // Mock authentication
//     if (username === 'user' && password === 'password') {
//         const { userId } = response.data; // Extract the userId from the response
//         localStorage.setItem('userId', userId); // Store userId in localStorage
//       onLogin();
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleLogin}>
//         <Title>Login</Title>
//         <Input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit">Login</Button>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//       </Form>
//     </Container>
//   );
// };

// export default Login;
