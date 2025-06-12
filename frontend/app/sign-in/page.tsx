'use client';
import { useState } from 'react';
import { TextInput, Button, Container, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.access_token);
      router.push('/tasks');
    } else {
      alert('Login failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Sign In</Title>
      <TextInput label="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
      <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} mt="md" />
      <Button fullWidth mt="xl" onClick={handleLogin}>Login</Button>
    </Container>
  );
}