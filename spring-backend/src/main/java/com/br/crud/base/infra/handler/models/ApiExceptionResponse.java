package com.br.crud.base.infra.handler.models;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiExceptionResponse {

    private Integer status;
    private String message;
    private Long timeStamp;

}
