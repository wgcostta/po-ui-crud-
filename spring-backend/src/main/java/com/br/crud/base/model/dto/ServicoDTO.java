package com.br.crud.base.model.dto;

import com.br.crud.base.infra.repository.entity.ServicoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServicoDTO {

    private Integer id;
    private String descricao;
    private LocalDate dataAbertura;
    private Character status;
    private Integer idComputador;
    private String descComputador;
    private Integer idLaboratorio;
    private String descLaboratorio;
    private Integer idUsuario;
    private String nomeUsuario;
    private String emailUsuario;

    public ServicoDTO(ServicoEntity servicoEntity){
        this.id = servicoEntity.getId();
        this.descricao = servicoEntity.getDescricao();
        this.dataAbertura = servicoEntity.getDataAbertura();
        this.status = servicoEntity.getStatus();
        this.idLaboratorio = servicoEntity.getLaboratorio().getId();
        this.descLaboratorio = servicoEntity.getLaboratorio().getDescricao();
        this.idComputador = servicoEntity.getComputador().getId();
        this.descComputador = servicoEntity.getComputador().getDescricao();
        this.idUsuario = servicoEntity.getUsuario().getId();
        this.nomeUsuario = servicoEntity.getUsuario().getNome();
        this.emailUsuario = servicoEntity.getUsuario().getEmail();
    }

    public static List<ServicoDTO> converter(List<ServicoEntity> servicos) {
        return servicos.stream().map(ServicoDTO::new).collect(Collectors.toList());
    }
}
