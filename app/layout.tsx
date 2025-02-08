import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Whispr</title>
      </head>
      <body>
      <UserProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
       </UserProvider>
      </body>
    </html>
  );
}