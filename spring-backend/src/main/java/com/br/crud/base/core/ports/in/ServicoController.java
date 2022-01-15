package com.br.crud.base.core.ports.in;

import com.br.crud.base.infra.repository.entity.ComputadorEntity;
import com.br.crud.base.infra.repository.crud.ComputadorRepository;
import com.br.crud.base.infra.repository.crud.LaboratorioRepository;
import com.br.crud.base.model.dto.ServicoDTO;
import com.br.crud.base.infra.repository.entity.LaboratorioEntity;
import com.br.crud.base.infra.repository.entity.ServicoEntity;
import com.br.crud.base.infra.repository.entity.UsuarioEntity;
import com.br.crud.base.infra.repository.crud.ServicoRepository;
import com.br.crud.base.infra.repository.crud.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/servicos")
@RequiredArgsConstructor
public class ServicoController {
    private final ServicoRepository servicoRepository;
    private final ComputadorRepository computadorRepository;
    private final LaboratorioRepository laboratorioRepository;
    private final UsuarioRepository usuarioRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoEntity save(@RequestBody ServicoDTO dto){
        Integer idLab = dto.getIdLaboratorio();
        Integer idComp = dto.getIdComputador();
        Integer idUser = dto.getIdUsuario();

        //LocalDate data = LocalDate.parse(dto.getDataAbertura(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));


        LaboratorioEntity laboratorio = laboratorioRepository
                .findById(idLab)
                .orElseThrow(()->
                        new ResponseStatusException(HttpStatus.BAD_REQUEST,"Lab não encontrado"));

        ComputadorEntity computador = computadorRepository
                .findById(idComp)
                .orElseThrow(()->
                        new ResponseStatusException(HttpStatus.BAD_REQUEST,"Computador não encontrado"));

        UsuarioEntity usuario = usuarioRepository
                .findById(idUser)
                .orElseThrow(()->
                                new ResponseStatusException(HttpStatus.BAD_REQUEST,"Usuario não encontrado"));


        ServicoEntity servico = new ServicoEntity();
        servico.setId(dto.getId());
        servico.setDescricao(dto.getDescricao());
        servico.setDataAbertura(dto.getDataAbertura());
        servico.setStatus(dto.getStatus());
        servico.setLaboratorio(laboratorio);
        servico.setComputador(computador);
        servico.setUsuario(usuario);
        return servicoRepository.save(servico);
    }

    @GetMapping
    public List<ServicoDTO> listar(@RequestParam(required = false) Character status){
        if(status == null){
            List<ServicoEntity> servicos = servicoRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            return ServicoDTO.converter(servicos);
        }else{
            List<ServicoEntity> servicos = servicoRepository.findByStatusOrderByIdDesc(status);
            return ServicoDTO.converter(servicos);
        }

    }


}
