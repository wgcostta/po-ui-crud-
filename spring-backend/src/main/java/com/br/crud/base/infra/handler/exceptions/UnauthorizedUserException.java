package com.br.crud.base.infra.handler.exceptions;

public class UnauthorizedUserException extends RuntimeException{

    public UnauthorizedUserException(String message) {
        super(message);
    }

    public UnauthorizedUserException(String message, Throwable cause) {
        super(message, cause);
    }
}
