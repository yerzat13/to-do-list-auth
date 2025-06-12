'use client';

import { Container, Title, Button, Paper, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#121212', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Container size="xs">
        <Paper
          p={40}
          radius="lg"
          shadow="md"
          style={{
            backgroundColor: '#212529',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <Title order={2} mb="sm" color="white">📋 To-Do App</Title>
          <Text color="gray" mb="xl">
            Manage tasks - simply, quickly, conveniently.
          </Text>

          <Stack spacing="md">
            <Button
              radius="xl"
              size="lg"
              fullWidth
              variant="filled"
              style={{
                backgroundColor: '#1c7ed6',
                border: '2px solid #1971c2',
                transition: 'all 0.3s ease',
              }}
              onClick={() => router.push('/sign-in')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1971c2';
                e.currentTarget.style.transform = 'scale(1.05)'; 
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1c7ed6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Login
            </Button>

            <Button
              radius="xl"
              size="lg"
              fullWidth
              variant="outline"
              style={{
                border: '2px solid #868e96',
                transition: 'all 0.3s ease',
              }}
              onClick={() => router.push('/sign-up')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f3f5';
                e.currentTarget.style.transform = 'scale(1.05)'; 
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Register
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}