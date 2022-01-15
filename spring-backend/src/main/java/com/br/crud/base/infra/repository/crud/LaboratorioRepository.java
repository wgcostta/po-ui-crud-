package com.br.crud.base.infra.repository.crud;

import com.br.crud.base.infra.repository.entity.LaboratorioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratorioRepository extends JpaRepository<LaboratorioEntity,Integer> {
}
