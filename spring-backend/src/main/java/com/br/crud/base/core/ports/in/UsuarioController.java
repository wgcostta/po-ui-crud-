package com.br.crud.base.core.ports.in;

import com.br.crud.base.infra.handler.exceptions.ResourceDuplicationException;
import com.br.crud.base.infra.repository.crud.UsuarioRepository;
import com.br.crud.base.infra.repository.entity.UsuarioEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    @GetMapping
    @Cacheable(value = "listaUsuarios")
    public ResponseEntity<?> listarTodos(@RequestParam(required = false) String email) {
        if (email == null) {
            return ResponseEntity.ok(usuarioRepository.findAll());
        } else {
            return ResponseEntity.ok(usuarioRepository.findByEmail(email));
        }

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(value = "listaUsuarios", allEntries = true)
    public void salvar(@RequestBody UsuarioEntity usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail())
                .isPresent())
            throw new ResourceDuplicationException("Já existe um cadastro para o E-mail informado");

        usuarioRepository.save(usuario);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @CacheEvict(value = "listaUsuarios", allEntries = true)
    public void delete(@PathVariable Integer id) {
        usuarioRepository.deleteById(id);
    }
}
