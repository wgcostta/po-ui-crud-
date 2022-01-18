package com.br.crud.base.infra.handler.exceptions;

public class ResourceDuplicationException extends RuntimeException {
    public ResourceDuplicationException(String message) {
        super(message);
    }
}
