#!/bin/bash

IDENTITY_EXAMPLE_ENV_FILE="identity-api/.env.example"
IDENTITY_ENV_FILE="identity-api/.env"

PRICING_EXAMPLE_ENV_FILE="pricing-api/.env.example"
PRICING_ENV_FILE="pricing-api/.env"

if [ -f "$IDENTITY_EXAMPLE_ENV_FILE" ]; then
    if [ ! -f "$IDENTITY_ENV_FILE" ]; then
        cp "$IDENTITY_EXAMPLE_ENV_FILE" "$IDENTITY_ENV_FILE"
        echo "Copied .env.example to identity folder .env"
    fi
else
    echo "Error: .env.example file not found in identity-api folder."
fi

if [ -f "$PRICING_EXAMPLE_ENV_FILE" ]; then
    if [ ! -f "$PRICING_ENV_FILE" ]; then
        cp "$PRICING_EXAMPLE_ENV_FILE" "$PRICING_ENV_FILE"
        echo "Copied .env.example to pricing folder .env.test"
    fi
else
    echo "Error: .env.example file not found in pricing-api folder."
fi
