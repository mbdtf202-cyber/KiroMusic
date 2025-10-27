# AI功能部署检查清单

## 📋 部署前检查

### 1. 环境准备

#### 系统要求
- [ ] Node.js >= 14.x
- [ ] npm >= 6.x
- [ ] 内存 >= 4GB (推荐 8GB)
- [ ] 磁盘空间 >= 2GB

#### 依赖安装
- [ ] 后端依赖已安装 (`cd backend && npm install`)
- [ ] 前端依赖已安装 (`cd frontend && npm install`)
- [ ] TensorFlow.js正常工作
- [ ] 所有必需的npm包已安装

### 2. 配置检查

#### 环境变量
- [ ] `backend/.env` 文件已创建
- [ ] `PORT` 已配置 (默认3001)
- [ ] `NODE_ENV` 已设置
- [ ] `OPENAI_API_KEY` 已配置 (可选)
- [ ] 其他API密钥已配置 (可选)

#### 文件权限
- [ ] `backend/models/` 目录可写
- [ ] 日志目录可写
- [ ] 临时文件目录可写

### 3. 功能测试

#### 基础测试
- [ ] 运行 `node backend/test-ai.js` 通过
- [ ] AI服务初始化成功
- [ ] 所有模型加载成功
- [ ] 健康检查通过

#### API测试
- [ ] `/api/ai/health` 返回正常
- [ ] `/api/ai/investment-recommendation/:id` 工作正常
- [ ] `/api/ai/predict-hits` 返回数据
- [ ] `/api/admin/ai/health` 可访问

#### 前端测试
- [ ] AI助手页面可访问
- [ ] 所有标签页正常显示
- [ ] 组件加载无错误
- [ ] API调用成功

### 4. 性能检查

#### 响应时间
- [ ] API响应时间 < 2秒
- [ ] 模型加载时间 < 5秒
- [ ] 页面加载时间 < 3秒

#### 资源使用
- [ ] 内存使用 < 2GB
- [ ] CPU使用 < 80%
- [ ] 磁盘IO正常

#### 并发测试
- [ ] 支持10个并发请求
- [ ] 支持100个并发请求 (可选)
- [ ] 无内存泄漏

### 5. 安全检查

#### API安全
- [ ] 速率限制已启用
- [ ] 输入验证正常工作
- [ ] 错误处理不泄露敏感信息
- [ ] CORS配置正确

#### 数据安全
- [ ] 敏感数据已加密
- [ ] API密钥安全存储
- [ ] 用户数据隔离
- [ ] 日志不包含敏感信息

### 6. 监控和日志

#### 日志配置
- [ ] 日志级别正确设置
- [ ] 日志文件正常写入
- [ ] 错误日志正常记录
- [ ] 访问日志正常记录

#### 监控配置
- [ ] 健康检查端点可用
- [ ] 统计信息可查询
- [ ] 性能指标可监控

## 🚀 部署步骤

### 开发环境部署

1. **克隆代码**
```bash
git clone <repository>
cd kiromusic
```

2. **安装依赖**
```bash
npm run install:all
```

3. **配置环境**
```bash
cp backend/.env.example backend/.env
# 编辑 backend/.env 配置必要的环境变量
```

4. **测试AI功能**
```bash
cd backend
node test-ai.js
```

5. **启动服务**
```bash
# 终端1 - 后端
cd backend
npm run dev

# 终端2 - 前端
cd frontend
npm run dev
```

6. **验证部署**
- 访问 http://localhost:5173
- 访问 http://localhost:5173/ai-assistant
- 测试各项AI功能

### 生产环境部署

1. **构建前端**
```bash
cd frontend
npm run build
```

2. **配置生产环境变量**
```bash
# backend/.env
NODE_ENV=production
PORT=3001
# 其他生产环境配置
```

3. **启动后端服务**
```bash
cd backend
npm start
```

4. **配置反向代理** (Nginx示例)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

5. **配置进程管理** (PM2示例)
```bash
# 安装PM2
npm install -g pm2

# 启动后端
cd backend
pm2 start src/server.js --name kiromusic-backend

# 保存配置
pm2 save
pm2 startup
```

6. **配置SSL证书** (Let's Encrypt)
```bash
sudo certbot --nginx -d your-domain.com
```

## 🔍 部署后验证

### 功能验证
- [ ] 所有API端点正常工作
- [ ] AI功能正常响应
- [ ] 前端页面正常显示
- [ ] 数据正常存储和读取

### 性能验证
- [ ] 响应时间符合要求
- [ ] 资源使用在正常范围
- [ ] 并发处理正常
- [ ] 缓存正常工作

### 安全验证
- [ ] HTTPS正常工作
- [ ] API认证正常
- [ ] 速率限制生效
- [ ] 错误处理正确

## 📊 监控设置

### 健康检查
```bash
# 设置定时健康检查
*/5 * * * * curl http://localhost:3001/api/ai/health
```

### 日志监控
```bash
# 查看实时日志
pm2 logs kiromusic-backend

# 查看错误日志
tail -f backend/logs/error.log
```

### 性能监控
```bash
# 查看进程状态
pm2 status

# 查看资源使用
pm2 monit
```

## 🐛 故障排除

### 常见问题

#### 1. AI服务初始化失败
**症状**: 服务器启动但AI功能不可用

**解决方案**:
```bash
# 检查日志
tail -f backend/logs/error.log

# 手动初始化
cd backend
node src/ai/initialize.js

# 检查依赖
npm list @tensorflow/tfjs-node
```

#### 2. 模型加载失败
**症状**: 模型相关功能报错

**解决方案**:
```bash
# 删除旧模型
rm -rf backend/models/*

# 重新初始化
node src/ai/initialize.js

# 检查磁盘空间
df -h
```

#### 3. 内存不足
**症状**: 服务器崩溃或响应缓慢

**解决方案**:
```bash
# 增加Node.js内存限制
node --max-old-space-size=4096 src/server.js

# 或在PM2中配置
pm2 start src/server.js --node-args="--max-old-space-size=4096"
```

#### 4. API超时
**症状**: 请求超时或响应缓慢

**解决方案**:
```bash
# 清理缓存
curl -X POST http://localhost:3001/api/admin/ai/clear-cache

# 重启服务
pm2 restart kiromusic-backend

# 检查系统资源
top
```

## 📈 优化建议

### 性能优化
- [ ] 启用Redis缓存
- [ ] 配置CDN加速
- [ ] 优化数据库查询
- [ ] 启用Gzip压缩

### 扩展性优化
- [ ] 配置负载均衡
- [ ] 使用容器化部署
- [ ] 配置自动扩展
- [ ] 使用消息队列

### 安全优化
- [ ] 配置WAF
- [ ] 启用DDoS防护
- [ ] 定期安全审计
- [ ] 更新依赖包

## 📝 维护计划

### 日常维护
- [ ] 每日检查日志
- [ ] 每日检查性能指标
- [ ] 每日备份数据

### 每周维护
- [ ] 检查系统更新
- [ ] 清理临时文件
- [ ] 优化数据库
- [ ] 检查安全漏洞

### 每月维护
- [ ] 更新依赖包
- [ ] 性能优化
- [ ] 安全审计
- [ ] 备份验证

## ✅ 部署完成确认

- [ ] 所有检查项已完成
- [ ] 功能测试通过
- [ ] 性能测试通过
- [ ] 安全测试通过
- [ ] 监控已配置
- [ ] 文档已更新
- [ ] 团队已培训

## 📞 支持联系

- 技术支持: support@kiromusic.io
- 紧急联系: emergency@kiromusic.io
- 文档: https://docs.kiromusic.io

---

**部署日期**: ___________
**部署人员**: ___________
**验证人员**: ___________
**状态**: [ ] 完成 [ ] 待完成
