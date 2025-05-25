export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  const res = await fetch('http://localhost:8000/api/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('access', data.access);
    return data.access;
  } else {
    logout();
  }
};
