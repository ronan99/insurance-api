# Waner-On Life Insurance Pricing

## US-5 - Eu, como Admin, posso alterar uma cobertura, para que a precificação esteja atualizada.

A cobertura deve poder ser atualizada em qualquer campo, exceto o id gerado. E deve respeitar as mesmas regras do cadastro.

Os campos podem ser atualizados todos ou parcialmente, nesse caso, se o endpoint de edição for chamado passando apenas um campo, somente este campo deve ser alterado na cobertura.

Ao editar um item que foi deletado [US-6](./us-6-remove-coverage.md), este deve ser "ativado" novamente, sobrescrevendo o soft delete.

**PUT** `/coverage/:coverageId`

Request Payload
```json
{
    "name": <string>,
    "description": <string>,
    "capital": <number>,
    "premium": <number>
}
```

Response Payload - HTTP STATUS `200`
```json
{
    "data": {
        "coverageId": <string>,
        "name": <string>,
        "description": <string>,
        "capital": <number>,
        "premium": <number>
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

Error Response - HTTP STATUS `409` - CONFLICT, cobertura já existe com o nome
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
