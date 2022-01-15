package com.br.crud.base.infra.repository.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "servicos")
public class ServicoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer id;
    @NotNull
    private String descricao;
    @NotNull
    private Character status;
    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataAbertura;
    @ManyToOne
    @JoinColumn(name = "id_laboratorio", referencedColumnName = "id")
    private LaboratorioEntity laboratorio;
    @ManyToOne
    @JoinColumn(name = "id_computador", referencedColumnName = "id")
    private ComputadorEntity computador;
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private UsuarioEntity usuario;

    @PrePersist
    public void prePersist(){
        setDataAbertura(LocalDate.now());
    }

}
