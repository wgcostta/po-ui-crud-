package com.br.crud.base.infra.handler.exceptions;

public class ApiException extends RuntimeException{

    public ApiException(String message) {
        super(message);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
