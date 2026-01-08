# Устранение проблемы 502 Bad Gateway

## Диагностика проблемы

### 1. Проверьте статус контейнера

```bash
# Проверьте, запущен ли контейнер
docker compose ps

# Проверьте логи контейнера
docker compose logs app

# Или более детальные логи
docker compose logs -f app
```

### 2. Проверьте, что контейнер слушает на порту 3000

```bash
# Проверьте порты контейнера
docker port masters-glossary-frontend

# Или проверьте изнутри контейнера
docker exec masters-glossary-frontend netstat -tlnp
# или
docker exec masters-glossary-frontend ss -tlnp
```

### 3. Проверьте конфигурацию Nginx

Nginx должен проксировать запросы на контейнер. Проверьте конфигурацию nginx:

```bash
# Найдите конфигурацию nginx для вашего сайта
sudo nano /etc/nginx/sites-available/dumbus-web-tech.ru
# или
sudo nano /etc/nginx/conf.d/dumbus-web-tech.ru.conf
```

Конфигурация должна содержать что-то вроде:

```nginx
server {
    listen 80;
    server_name dumbus-web-tech.ru;

    location /glossary {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**ВАЖНО**: Если nginx работает в Docker, используйте имя сервиса вместо `127.0.0.1`:
```nginx
proxy_pass http://masters-glossary-frontend:3000;
```

### 4. Проверьте доступность приложения из nginx

```bash
# Если nginx в Docker
docker exec -it nginx-container curl http://127.0.0.1:3000

# Если nginx на хосте
curl http://127.0.0.1:3000
```

### 5. Перезапустите контейнер

```bash
# Пересоберите и перезапустите
docker compose down
docker compose up -d --build

# Или просто перезапустите
docker compose restart
```

## Возможные решения

### Решение 1: Исправление конфигурации Nginx

Если nginx работает на хосте (не в Docker), убедитесь, что `proxy_pass` указывает на `127.0.0.1:3000`:

```nginx
location /glossary {
    proxy_pass http://127.0.0.1:3000;
    # ... остальные настройки
}
```

### Решение 2: Если nginx в Docker

Если nginx тоже в Docker, убедитесь, что оба контейнера в одной сети:

```yaml
# docker-compose.yml для nginx
services:
  nginx:
    networks:
      - app-network
  app:
    networks:
      - app-network
```

И используйте имя сервиса в proxy_pass:
```nginx
proxy_pass http://app:3000;
```

### Решение 3: Проверка файрвола

Убедитесь, что порт 3000 не заблокирован:

```bash
# Проверьте открытые порты
sudo netstat -tlnp | grep 3000
# или
sudo ss -tlnp | grep 3000
```

### Решение 4: Проверка прав доступа

Убедитесь, что файлы в `dist` доступны:

```bash
docker exec masters-glossary-frontend ls -la /app/dist
```

## Быстрая проверка

Выполните эти команды по порядку:

```bash
# 1. Проверка контейнера
docker compose ps

# 2. Проверка логов
docker compose logs app | tail -20

# 3. Проверка доступности
curl http://127.0.0.1:3000

# 4. Проверка nginx
sudo nginx -t
sudo systemctl status nginx
```

