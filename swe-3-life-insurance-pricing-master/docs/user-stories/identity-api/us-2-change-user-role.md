# Waner-On Life Insurance Pricing

## US-2 - Eu, como Admin, alterar a role de um usuário para `user` ou `admin`

O Admin deve alterar a role de um usuário. As roles permitidas são `user` ou `admin`

**PATCH** `/users/:userId`

Request Payload
```json
{
    "role": <string>
}
```

Response Payload - HTTP STATUS `200`
```json
{
    "data": {
        "userId": <string>,
        "username": <string>,
        "role": <string>
    }
}
```

Error Response - HTTP STATUS `400` - BAD REQUEST, mais mensagem para o campo vazio ou inválido
```json
{
    "error": {
        "code": <number>,
        "message": <string>
    }
}
```

Error Response - HTTP STATUS `401` - UNAUTHORIZED, login não autorizado
```json
{
    "error": {
        "code": <number>,
        "message": <string>
    }
}
```

Error Response - HTTP STATUS `403` - FORBIDDEN, login não autorizado para esta ação
```json
{
    "error": {
        "code": <number>,
        "message": <string>
    }
}
```

Error Response - HTTP STATUS `404` - NOT FOUND, usuário não encontrado
```json
{
    "error": {
        "code": <number>,
        "message": <string>
    }
}
```

Error Response - HTTP STATUS `500` - INTERNAL ERROR, algo inesperado aconteceu, seja conexão com banco ou falhas inesperadas
```json
{
    "error": {
        "code": <number>,
        "message": <string>
    }
}
```
