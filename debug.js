// debug.js
const fs = require('fs');

console.log('=== ДИАГНОСТИКА db.json ===');

try {
  const data = fs.readFileSync('db.json', 'utf8');
  console.log('1. Файл db.json существует и читается');
  
  const json = JSON.parse(data);
  console.log('2. JSON парсится успешно');
  
  console.log('3. Пользователи в базе:');
  if (json.users && Array.isArray(json.users)) {
    console.log(`   Всего пользователей: ${json.users.length}`);
    
    json.users.forEach((user, index) => {
      console.log(`   ${index + 1}. ID: ${user.id}, username: ${user.username}`);
      
      // Проверяем структуру
      const keys = Object.keys(user);
      console.log(`      Поля: ${keys.join(', ')}`);
      console.log(`      ID первое поле? ${keys[0] === 'id'}`);
      
      // Проверяем доступ по ID
      if (user.id === 1) {
        console.log(`      --- НАЙДЕН ПОЛЬЗОВАТЕЛЬ С ID=1 ---`);
        console.log(`      Полный объект:`, JSON.stringify(user, null, 2));
      }
    });
    
    // Ищем пользователя с ID=1
    const user1 = json.users.find(u => u.id === 1);
    if (user1) {
      console.log('\n4. Пользователь с ID=1 НАЙДЕН в массиве');
    } else {
      console.log('\n4. Пользователь с ID=1 НЕ НАЙДЕН в массиве!');
      console.log('   Доступные ID:', json.users.map(u => u.id));
    }
  } else {
    console.log('   ОШИБКА: users не массив или не существует');
  }
} catch (error) {
  console.error('ОШИБКА:', error.message);
}

console.log('\n=== КОНЕЦ ДИАГНОСТИКИ ===');