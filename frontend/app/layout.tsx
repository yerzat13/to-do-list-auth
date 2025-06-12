import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, Container } from '@mantine/core';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ToDo App</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#121212', color: '#f1f1f1' }}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
            primaryColor: 'blue',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <main style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)',
          }}>
            <header style={{
              background: '#1c7ed6',
              padding: '1rem 2rem',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none' }}>ToDo App</a>
            </header>

            <Container style={{ flexGrow: 1, paddingTop: '2rem' }}>
              {children}
            </Container>

            <footer style={{
              background: '#1c7ed6',
              padding: '1rem 2rem',
              color: 'white',
              marginTop: 'auto',
              textAlign: 'center',
              boxShadow: '0 -2px 8px rgba(0,0,0,0.2)'
            }}>
              © 2025 Yerzat's Project
            </footer>
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
