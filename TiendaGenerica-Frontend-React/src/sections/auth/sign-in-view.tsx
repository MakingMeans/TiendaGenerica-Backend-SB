import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { login } from 'src/modules/auth/auth.service';
import { useAuth } from 'src/modules/auth/auth.context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = useCallback(async () => {
    try {
      setError('');

      const loginData = {
        username: email,
        password,
      };

      console.log('🚀 Starting login process with data:', loginData);

      const response = await login(loginData);

      console.log('🎉 Login successful, token received:', response.token ? 'YES' : 'NO');

      loginUser(response.token);

      navigate('/');
    } catch (err) {
      console.error('💥 Login failed:', err);

      const errorMessage = (err as any)?.response?.data?.message ||
                          (err as any)?.response?.data?.error ||
                          (err as any)?.message ||
                          'Credenciales inválidas';

      setError(errorMessage);
    }
  }, [email, password, loginUser, navigate]);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email - Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

     

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        sx={{ mb: 1 }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}

        
      />

      

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        size="large"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in

      </Button>
      
      
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
       
      </Box>

      {renderForm}

    </>
  );
}