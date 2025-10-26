#!/bin/bash

# Nginx域名配置脚本
# 用于配置 lelinksolar.com 域名

echo "🔧 配置Nginx域名支持..."
echo ""

# 创建Nginx配置文件
cat > /tmp/lelink-solar << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name lelinksolar.com www.lelinksolar.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

echo "✅ Nginx配置文件已创建"
echo ""
echo "📋 配置文件内容："
cat /tmp/lelink-solar
echo ""
echo "🚀 请在Linode服务器上执行以下命令："
echo ""
echo "sudo mv /tmp/lelink-solar /etc/nginx/sites-available/lelink-solar"
echo "sudo ln -sf /etc/nginx/sites-available/lelink-solar /etc/nginx/sites-enabled/"
echo "sudo nginx -t"
echo "sudo systemctl reload nginx"
echo ""
echo "✅ 完成后，域名就可以访问了！"

