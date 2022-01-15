package com.br.crud.base.infra.repository.crud;

import com.br.crud.base.infra.repository.entity.ServicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoConcluidoRepository extends JpaRepository<ServicoEntity,Integer> {

    Long countByStatus(Character status);
}
