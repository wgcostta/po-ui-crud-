package com.br.crud.base.infra.handler.exceptions;

public class ParametersIncorrectException extends RuntimeException{

    public ParametersIncorrectException(String message) {
        super(message);
    }

    public ParametersIncorrectException(String message, Throwable cause) {
        super(message, cause);
    }
}
