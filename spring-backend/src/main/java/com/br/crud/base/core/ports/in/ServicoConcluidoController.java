package com.br.crud.base.core.ports.in;

import com.br.crud.base.infra.repository.crud.ServicoConcluidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servicos-concluidos")
@RequiredArgsConstructor
public class ServicoConcluidoController {
    private final ServicoConcluidoRepository servicoConcluidoRepository;

    /*@PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoConcluidoEntity salvar(@RequestBody ServicoConcluidoEntity servicoConcluido){
        return servicoConcluidoRepository.save(servicoConcluido);
    }*/

    @GetMapping
    public Long buscarCount(@RequestParam(required = false) Character status){
            return servicoConcluidoRepository.countByStatus(status);
    }


}
