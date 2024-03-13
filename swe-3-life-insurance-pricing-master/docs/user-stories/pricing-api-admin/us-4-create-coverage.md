# Waner-On Life Insurance Pricing

## US-4 - Eu, como Admin, posso cadastrar um novo tipo de cobertura, para que seja selecionada durante a precificação.

A cobertura é um item dentro do produto de seguro de vida, e para garantir a precificação dinâmica, cada precificação deve receber um conjunto de coberturas, além das informações do segurado (tratado na [US-7](../pricing-api-user/us-7-dynamic-pricing.md))

Para isso será necessário desenvolver um cadastro e manutenção das coberturas.

A cada cobertura deve ter um nome e descrição, além de um id único gerado pelo sistema, e os campos capital e premium.

Para este case e a forma que a cobertura será utilizada na precificação, o valor do capital deve ser um múltiplo de 10 maior ou igual a 1000. 

O premio deve ser um valor maior que 0 e menor do que 30% o valor do capital,

O nome deve ser único no cadastro.


Exemplo de coberturas:
```
Invalidez Funcional Permanente Total por Doença

Essa cobertura garante a antecipação do pagamento da indenização relativa à garantia básica de Morte, em caso de invalidez funcional permanente total, consequente de doença.
```

```
Indenização Especial por Morte Acidental

Essa cobertura garante um pagamento adicional, de mesmo valor, da indenização do seguro por Morte. Ou seja, o(s) beneficiário(s) da indenização receberá(ão) o dobro do capital segurado em caso de morte especifica por acidente.
```


**POST** `/coverage`

Request Payload
```json
{
    "name": <string>,
    "description": <string>,
    "capital": <number>,
    "premium": <number>
}
```

Response Payload - HTTP STATUS `201`
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
