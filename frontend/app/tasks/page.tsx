'use client';

import { useEffect, useState } from 'react';
import {
  TextInput,
  Button,
  Container,
  Title,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const router = useRouter();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) router.push('/sign-in');
    else fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://127.0.0.1:8000/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    await fetch('http://127.0.0.1:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: text }),
    });
    setText('');
    fetchTasks();
  };

  const updateTask = async (id: number) => {
    if (!editingText.trim()) return;
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editingText }),
    });
    setEditingId(null);
    setEditingText('');
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right,rgb(25, 55, 85),rgb(40, 54, 68))',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '60px',
      }}
    >
      <Container size="sm">
        <Paper
          shadow="lg"
          p={30}
          radius="lg"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #ced4da',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Group position="apart" mb="lg">
            <Title order={2} style={{ color: '#212529' }}>
              📝 My tasks
            </Title>
            <Button
              radius="xl"
              color="red"
              style={{
                backgroundColor: '#fa5252',
                border: '2px solid #f03e3e',
                transition: 'all 0.3s ease',
              }}
              onClick={logout}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e03131';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fa5252';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              LogOut
            </Button>
          </Group>

          <Group mb="md">
            <TextInput
              placeholder="Add new task..."
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              radius="xl"
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
            />
            <Button
              radius="xl"
              onClick={addTask}
              style={{
                backgroundColor: '#51cf66',
                border: '2px solid #40c057',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#40c057';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#51cf66';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Add
            </Button>
          </Group>

          <Stack spacing="xs">
            {tasks.length === 0 ? (
              <Text color="dimmed" align="center" mt="md">
                There are no tasks yet
              </Text>
            ) : (
              tasks.map((task: any) => (
                <Paper
                  key={task.id}
                  p="md"
                  radius="md"
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    fontSize: '16px',
                    color: '#212529',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.01)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {editingId === task.id ? (
                    <Group>
                      <TextInput
                        value={editingText}
                        onChange={(e) =>
                          setEditingText(e.currentTarget.value)
                        }
                        style={{ flex: 1 }}
                      />
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => updateTask(task.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        color="gray"
                        onClick={() => {
                          setEditingId(null);
                          setEditingText('');
                        }}
                      >
                        Cancel
                      </Button>
                    </Group>
                  ) : (
                    <Group position="apart">
                      <Text>{task.title}</Text>
                      <Group>
                        <Button
                          size="xs"
                          color="blue"
                          variant="light"
                          onClick={() => {
                            setEditingId(task.id);
                            setEditingText(task.title);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          color="red"
                          variant="light"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Group>
                  )}
                </Paper>
              ))
            )}
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
