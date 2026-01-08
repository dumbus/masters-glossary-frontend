#!/bin/bash
# Скрипт для проверки конфигурации nginx

echo "=== Проверка конфигурации nginx ==="
echo ""

# Найти конфигурацию для домена
echo "Ищем конфигурацию nginx для dumbus-web-tech.ru..."
echo ""

# Проверяем sites-available
if [ -f "/etc/nginx/sites-available/dumbus-web-tech.ru" ]; then
    echo "Найдена конфигурация: /etc/nginx/sites-available/dumbus-web-tech.ru"
    echo ""
    echo "Содержимое конфигурации:"
    cat /etc/nginx/sites-available/dumbus-web-tech.ru
    echo ""
elif [ -f "/etc/nginx/sites-available/default" ]; then
    echo "Проверяем default конфигурацию..."
    grep -A 20 "dumbus-web-tech.ru\|glossary" /etc/nginx/sites-available/default || echo "Не найдено упоминаний в default"
    echo ""
fi

# Проверяем conf.d
if [ -f "/etc/nginx/conf.d/dumbus-web-tech.ru.conf" ]; then
    echo "Найдена конфигурация: /etc/nginx/conf.d/dumbus-web-tech.ru.conf"
    cat /etc/nginx/conf.d/dumbus-web-tech.ru.conf
    echo ""
fi

# Проверяем все конфигурации на упоминание glossary
echo "Ищем упоминания 'glossary' во всех конфигурациях nginx:"
grep -r "glossary" /etc/nginx/ 2>/dev/null || echo "Не найдено"
echo ""

# Проверяем логи nginx на ошибки
echo "Последние ошибки в логах nginx:"
tail -20 /var/log/nginx/error.log 2>/dev/null || echo "Логи недоступны"
echo ""

# Проверяем доступность порта 3000 из nginx
echo "Проверка доступности приложения из nginx:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://127.0.0.1:3000 || echo "Ошибка подключения"

