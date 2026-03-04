package com.tienda.clientservice.service;

import com.tienda.clientservice.dto.ClientDTO;
import java.util.List;

public interface ClientService {

    List<ClientDTO> findAll();

    ClientDTO findById(Long id);

    ClientDTO create(ClientDTO dto);

    ClientDTO update(Long id, ClientDTO dto);

    void delete(Long id);

    void deactivate(Long id);
}
