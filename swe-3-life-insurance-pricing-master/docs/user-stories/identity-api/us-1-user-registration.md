# Waner-On Life Insurance Pricing

## US-1 - Eu, como Admin, posso cadastrar novos usuários `admin`, fornecendo o email e senha

O Admin deve poder cadastrar novos usuários no sistema, esses usuários por padrão terão a role `user`.

O sistema deve gerar um id único para o usuário.

Não deve ser permitido o cadastro de `username` já existentes, também não se deve permitir uma `username` ou `password` vazios, ou seja, strings vazias ou contendo somente espaços.

O sistema deve garantir uma senha forte, que nesse caso devem seguir as seguintes regras:
- Conter no mínimo 8 caracteres
- Conter no máximo 64 caracteres
- Conter letras maiúsculas e minúsculas
- Conter números
- Conter pelo menos um dos seguintes símbolos @#!$%, outros símbolos não devem ser permitidos

*Dica: utilize Regex para validar a senha*

**POST** `/users`

Request Payload
```json
{
    "username": <string>,
    "password": <string>
}
```

Response Payload - HTTP STATUS 201
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

Error Response - HTTP STATUS `409` - CONFLICT, já existe outro usuário com este nome
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
