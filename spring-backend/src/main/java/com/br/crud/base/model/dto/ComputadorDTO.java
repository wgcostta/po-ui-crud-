package com.br.crud.base.model.dto;


import com.br.crud.base.infra.repository.entity.ComputadorEntity;
import com.sun.istack.NotNull;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComputadorDTO {
    @NotNull
    private Integer id;
    @NotNull
    private String descricao;
    private Integer idLaboratorio;
    private String descLaboratorio;



public ComputadorDTO(ComputadorEntity computadorEntity){
    this.id = computadorEntity.getId();
    this.descricao = computadorEntity.getDescricao();
    this.idLaboratorio = computadorEntity.getLaboratorio().getId();
    this.descLaboratorio = computadorEntity.getLaboratorio().getDescricao();
}


    public static List<ComputadorDTO> converter(List<ComputadorEntity> computadores) {
        return computadores.stream().map(ComputadorDTO::new).collect(Collectors.toList());
    }
}
