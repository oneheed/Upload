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
```sh
nohup node index.js &

或

pm2 start index.js
```


### 专案测试
```sh
curl --location --request POST 'http://localhost:8009/api/ImageUpload/PostFile' \
--form 'image=@"图档位置"'
```

```sh
curl --location --request GET 'http://localhost:8009/upload/{档名}'
```

### Nginx
```sh
		location /api/ImageUpload/PostFile {
			client_body_in_file_only 	on;
			client_body_buffer_size 	128k;
			client_max_body_size 		5M;
			
			proxy_set_header Host $host;
			proxy_set_header Connection "";
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header X-Forwarded-Proto $scheme;
			#proxy_set_header Content-Type "multipart/form-data";
			
			proxy_pass_request_headers 	on;
			proxy_set_header 			X-FILE $request_body_file;                     
			#proxy_set_body   			off;                   # 这行要注意会报错                        
			#proxy_redirect   			off;
			
			proxy_pass http://localhost:8009/api/ImageUpload/PostFile;
		}
```