package com.br.crud.base.core.ports.in;

import com.br.crud.base.infra.repository.entity.UsuarioEntity;
import com.br.crud.base.infra.repository.crud.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    @GetMapping
    @Cacheable(value = "listaUsuarios")
    public Object listarTodos(@RequestParam(required = false) String email){
        if(email == null){
            return usuarioRepository.findAll();
        }
        else{
            return usuarioRepository.findByEmail(email);
        }

    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(value = "listaUsuarios", allEntries = true)
    public void salvar(@RequestBody UsuarioEntity usuario){
        usuarioRepository.save(usuario);
    }

    @DeleteMapping("{id}")
    @CacheEvict(value = "listaUsuarios", allEntries = true)
    public void delete(@PathVariable Integer id) {usuarioRepository.deleteById(id);}
}
