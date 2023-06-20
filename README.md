# node-upload

## 专案初始化
```
npm install
```

### 专案设定
```json 
#config.json
{
    "port": 8009
}
```

### 专案背景执行
```
nohup node index.js &

或

pm2 start index.js
```


### 专案测试
```c
curl --location --request POST 'http://localhost:8009/api/ImageUpload/PostFile' \
--form 'image=@"图档位置"'
```

```c
curl --location --request GET 'http://localhost:8009/upload/{档名}'
```