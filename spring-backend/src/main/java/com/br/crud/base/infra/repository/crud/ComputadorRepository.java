package com.br.crud.base.infra.repository.crud;


import com.br.crud.base.infra.repository.entity.ComputadorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComputadorRepository extends JpaRepository<ComputadorEntity,Integer> {

 List<ComputadorEntity>findByLaboratorioId(Integer idLaboratorio);

}
