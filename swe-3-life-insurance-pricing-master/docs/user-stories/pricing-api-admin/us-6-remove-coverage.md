# Waner-On Life Insurance Pricing

## US-5 - Eu, como Admin, posso remover uma cobertura, para não permitir mais a precificação com esta cobertura.

Para este case, utilize um `soft delete` para remover a cobertura do banco de dados. Lembre-se que os itens deletados não devem poder ser utilizados na precificação.


**DELETE** `/coverage/:coverageId`


Response Payload - HTTP STATUS `200`
```json
{
    "data": {
        "success": <boolean>
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

Error Response - HTTP STATUS `404` - NOT FOUND, cobertura não encontrada
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
