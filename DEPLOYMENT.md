# Инструкция по развертыванию на VPS с ограниченной памятью (1GB RAM)

## Проблема
При сборке Docker образа на VPS с 1GB RAM процесс может зависать из-за нехватки памяти.

## Решение 1: Настройка Swap файла (ОБЯЗАТЕЛЬНО!)

Swap файл критически важен для работы с ограниченной памятью. Выполните на вашем VPS:

```bash
# Проверьте текущий swap
free -h

# Создайте swap файл размером 2GB (рекомендуется для 1GB RAM)
sudo fallocate -l 2G /swapfile

# Установите правильные права доступа
sudo chmod 600 /swapfile

# Создайте swap пространство
sudo mkswap /swapfile

# Включите swap
sudo swapon /swapfile

# Сделайте swap постоянным (добавьте в /etc/fstab)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Проверьте, что swap активен
free -h
```

## Решение 2: Очистка системы перед сборкой

Перед сборкой Docker образа освободите память:

```bash
# Остановите ненужные сервисы (если есть)
sudo systemctl stop nginx  # или другие сервисы

# Очистите кэш Docker
docker system prune -a --volumes

# Очистите системный кэш
sudo sync && sudo sysctl vm.drop_caches=3

# Проверьте свободную память
free -h
```

## Решение 3: Сборка с ограниченными ресурсами

Если проблема сохраняется, попробуйте собрать образ с явными лимитами:

```bash
# Соберите образ с ограничением памяти
docker build --memory=1g --memory-swap=3g -t masters-glossary-frontend .

# Или через docker compose с лимитами
docker compose build --memory=1g
```

## Решение 4: Альтернативный подход - сборка локально

Если сборка на VPS все еще не работает, соберите образ локально и загрузите на VPS:

```bash
# На локальной машине
docker build -t masters-glossary-frontend .
docker save masters-glossary-frontend | gzip > masters-glossary-frontend.tar.gz

# Загрузите на VPS и загрузите образ
scp masters-glossary-frontend.tar.gz user@your-vps:/tmp/
ssh user@your-vps
docker load < /tmp/masters-glossary-frontend.tar.gz
```
