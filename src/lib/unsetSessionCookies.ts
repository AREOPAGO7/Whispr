export const unsetSessionCookies = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
        // Redirecting after successful logout
        window.location.href = '/';  // This is only for client-side redirection
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  