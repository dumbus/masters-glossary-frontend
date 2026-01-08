# masters-glossary-frontend

Фронтенд приложение-глоссарий к ВКР на тему "Исследование производительности технологий виртуализации табличных компонентов в контексте веб-интерфейсов BI-систем".

React-приложение для визуализации и управления терминами глоссария с поддержкой графа связей между терминами.

## Запуск приложения

### Development режим (Локально)

Для запуска в режиме разработки:

```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:5173`

> **Примечание:** В режиме разработки приложение использует Vite dev server с hot module replacement (HMR).

### Production режим (Docker)

Для развертывания в Docker-контейнере:

1. Убедитесь, что на устройстве установлены Docker и Docker Compose

2. Соберите и запустите контейнер:

```bash
docker compose up -d --build
```

3. Приложение будет доступно внутри Docker сети на порту 3000 (HTTP)

> **Примечание:** Приложение работает по HTTP внутри Docker сети. Для доступа извне через HTTPS необходимо настроить Nginx как reverse proxy (см. раздел "Настройка Nginx").

#### Полезные команды

- Просмотр логов: `docker compose logs -f`
- Остановка: `docker compose down`
- Перезапуск: `docker compose restart`

#### Настройка Nginx

Для доступа к приложению через HTTPS на стандартном порту 443 необходимо настроить Nginx как reverse proxy:

1. Убедитесь, что контейнер запущен и работает:
```bash
docker ps
curl http://localhost:3000
```

2. Создайте или отредактируйте конфигурацию Nginx для вашего домена:
```bash
sudo nano /etc/nginx/sites-available/dumbus-web-tech.ru
```

3. Добавьте следующую конфигурацию (важно: `location /api/` должен быть перед `location /`):
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dumbus-web-tech.ru www.dumbus-web-tech.ru;

    ssl_certificate /etc/letsencrypt/live/dumbus-web-tech.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dumbus-web-tech.ru/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Проксирование API запросов на бэкенд
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Проксирование остальных запросов на фронтенд
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name dumbus-web-tech.ru www.dumbus-web-tech.ru;
    
    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}
```

4. Активируйте конфигурацию (если создаёте новую):
```bash
sudo ln -s /etc/nginx/sites-available/dumbus-web-tech.ru /etc/nginx/sites-enabled/
```

5. Проверьте конфигурацию:
```bash
sudo nginx -t
```

6. Перезагрузите Nginx:
```bash
sudo systemctl reload nginx
```

7. Приложение будет доступно по адресу: `https://dumbus-web-tech.ru`

> **Важно:** Убедитесь, что никакие сервисы не занимают порты 80 и 443. Nginx должен быть единственным сервисом, слушающим эти порты. Также убедитесь, что бэкенд API доступен на порту 8080 для корректной работы проксирования `/api/` запросов.

> Backend-часть: https://github.com/dumbus/masters-glossary-api
