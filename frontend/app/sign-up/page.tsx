'use client';
import { useState } from 'react';
import { TextInput, Button, Container, Title, Paper, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      router.push('/sign-in');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <Title align="center" order={2}>Sign Up</Title>
          <TextInput label="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <Button fullWidth mt="md" onClick={handleRegister}>Sign Up</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
