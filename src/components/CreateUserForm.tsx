// CreateUserForm.tsx
import React, { useState } from 'react';
import type { User } from '../types/types'; // Импортируем тип User
import { Typography } from '@mui/material';

// Тип для состояния формы, упрощенный
type FormData = Omit<User, 'id' | 'address' | 'company'> & {
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string; // Вводим как строку
      lng: string; // Вводим как строку
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bc: string; // Используем bc, как в оригинальном типе User
  };
};

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
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bc: '', // Используем bc
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Обработка вложенных полей (address, company)
    if (name.startsWith('address.')) {
      const subField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [subField]: value,
        },
      });
    } else if (name.startsWith('company.')) {
      const subField = name.split('.')[1];
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          [subField]: value,
        },
      });
    } else if (name.startsWith('geo.')) {
      const subField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          geo: {
            ...formData.address.geo,
            [subField]: value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Преобразуем geo координаты в числа
    // и формируем объект для отправки, соответствующий типу User
    const userDataToSubmit: Omit<User, 'id'> = {
      ...formData,
      address: {
        ...formData.address,
        geo: {
          lat: parseFloat(formData.address.geo.lat),
          lng: parseFloat(formData.address.geo.lng),
        },
      },
      company: {
        ...formData.company,
        // bc: formData.company.bc, // Уже включено через spread оператор
      }
    };

    console.log('Отправляемые данные:', userDataToSubmit); // Для отладки

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST', // Указываем метод POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataToSubmit), // Отправляем подготовленный объект
      });

      console.log('Ответ от API:', response); // Для отладки

      if (!response.ok) {
        // Более подробная информация об ошибке
        const errorText = await response.text();
        throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
      }

      const newUser: User = await response.json(); // Парсим ответ
      console.log('Создан пользователь:', newUser);
      setSuccess(true);
      // Опционально: сбросить форму после успешного создания
      // setFormData(initialFormData);
    } catch (err) {
      console.error('Ошибка при создании пользователя:', err);
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Создать нового пользователя</Typography>
      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
      {success && <div style={{ color: 'green' }}>Пользователь успешно создан!</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <Typography variant="subtitle1">Имя пользователя:</Typography>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            <Typography variant="subtitle1">Email:</Typography>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            <Typography variant="subtitle1">Телефон:</Typography>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            <Typography variant="subtitle1">Сайт:</Typography>
            <input
              type="text"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <h3>Адрес</h3>
        <div>
          <label>
            <Typography variant="subtitle1">Улица:</Typography>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">Квартира/Офис:</Typography>
            <input
              type="text"
              name="address.suite"
              value={formData.address.suite}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">Город:</Typography>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">Индекс:</Typography>
            <input
              type="text"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleChange}
            />
          </label>
        </div>
        <h4>Координаты</h4>
        <div>
          <label>
            <Typography variant="subtitle1">Широта (lat):</Typography>
            <input
              type="text"
              name="geo.lat"
              value={formData.address.geo.lat}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">Долгота (lng):</Typography>
            <input
              type="text"
              name="geo.lng"
              value={formData.address.geo.lng}
              onChange={handleChange}
            />
          </label>
        </div>

        <h3>Компания</h3>
        <div>
          <label>
            <Typography variant="subtitle1">Название:</Typography>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">Слоган:</Typography>
            <input
              type="text"
              name="company.catchPhrase"
              value={formData.company.catchPhrase}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant="subtitle1">BS (bc):</Typography>
            <input
              type="text"
              name="company.bc"
              value={formData.company.bc} // Используем bc
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать пользователя'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;