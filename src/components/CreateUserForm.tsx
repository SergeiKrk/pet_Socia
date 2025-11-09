// CreateUserForm.tsx
import React, { useState } from 'react';
import type { User } from '../types/types';
import {
  Typography,
  Grid,
  Box,
  TextField,
  FormControl,
  Stack,
  Button,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

type FormData = Omit<User, 'id' | 'address'> & {
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

interface IconTextFieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
}

const IconTextField: React.FC<IconTextFieldProps> = ({
  icon,
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  fullWidth = true,
}) => (
  <FormControl fullWidth margin="normal">
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      {icon}
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        variant="standard"
        fullWidth={fullWidth}
      />
    </Box>
  </FormControl>
);

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const subField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [subField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const userDataToSubmit: Omit<User, 'id'> = {
      ...formData,
      address: { ...formData.address },
    };

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDataToSubmit),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
      }

      const newUser: User = await response.json();
      console.log('Создан пользователь:', newUser);
      setSuccess(true);
    } catch (err) {
      console.error('Ошибка при создании пользователя:', err);
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="center" mb={3}>
        <Typography variant="h4">Регистрация нового пользователя</Typography>
      </Stack>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          Ошибка: {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" align="center" sx={{ mb: 2 }}>
          Пользователь успешно создан!
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <IconTextField
              icon={<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<PhoneIphoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<WebAssetIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Сайт"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Typography variant="h6">Адрес</Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid  size={6}>
            <IconTextField
              icon={<MapsHomeWorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Улица, дом"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<MeetingRoomIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Квартира/Офис"
              name="address.suite"
              value={formData.address.suite}
              onChange={handleChange}
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<FmdGoodIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Город"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid  size={6}>
            <IconTextField
              icon={<FmdGoodIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
              label="Индекс"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="center" my={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={loading}
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            {loading ? 'Создание...' : 'Создать пользователя'}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateUserForm;