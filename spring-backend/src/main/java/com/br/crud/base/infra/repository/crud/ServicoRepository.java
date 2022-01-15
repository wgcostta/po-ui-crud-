package com.br.crud.base.infra.repository.crud;

import com.br.crud.base.infra.repository.entity.ServicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicoRepository extends JpaRepository<ServicoEntity, Integer> {
    List<ServicoEntity> findByStatusOrderByIdDesc(Character status);


}
