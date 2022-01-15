package com.br.crud.base.core.ports.in;


import com.br.crud.base.infra.repository.crud.LaboratorioRepository;
import com.br.crud.base.infra.repository.entity.LaboratorioEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/laboratorios")
@RequiredArgsConstructor
public class LaboratorioController {
    private final LaboratorioRepository laboratorioRepository;

    @GetMapping
    @Cacheable(value = "listaLaboratorios")
    public List<LaboratorioEntity> listarTodos(){
        return laboratorioRepository.findAll();
    }

    @DeleteMapping("{id}")
    @CacheEvict(value = "listaLaboratorios", allEntries = true)
    public void deletar(@PathVariable Integer id){
        laboratorioRepository.deleteById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(value = "listaLaboratorios", allEntries = true)
    public LaboratorioEntity salvar(@RequestBody LaboratorioEntity laboratorio){
        return laboratorioRepository.save(laboratorio);
    }

}
