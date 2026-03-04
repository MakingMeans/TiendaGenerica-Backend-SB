package com.tienda.clientservice.service.impl;

import com.tienda.clientservice.dto.ClientDTO;
import com.tienda.clientservice.entity.Client;
import com.tienda.clientservice.exception.ResourceNotFoundException;
import com.tienda.clientservice.repository.ClientRepository;
import com.tienda.clientservice.service.ClientService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService{

    private final ClientRepository repository;

    @Override
    public List<ClientDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDTO findById(Long id) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        return convertToDTO(client);
    }

    @Override
    public ClientDTO create(ClientDTO dto) {

        if (repository.existsByCedula(dto.getCedula())) {
            throw new RuntimeException("Cedula already registered");
        }

        Client client = new Client();
        client.setCedula(dto.getCedula());
        client.setNombre(dto.getNombre());
        client.setApellido(dto.getApellido());
        client.setDireccion(dto.getDireccion());
        client.setTelefono(dto.getTelefono());
        client.setEmail(dto.getEmail());
        client.setActivo(true);

        Client saved = repository.save(client);

        return convertToDTO(saved);
    }

    @Override
    public ClientDTO update(Long id, ClientDTO dto) {

        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        if (!client.getCedula().equals(dto.getCedula())
                && repository.existsByCedula(dto.getCedula())) {
            throw new RuntimeException("Cedula already registered");
        }

        client.setCedula(dto.getCedula());
        client.setNombre(dto.getNombre());
        client.setApellido(dto.getApellido());
        client.setDireccion(dto.getDireccion());
        client.setTelefono(dto.getTelefono());
        client.setEmail(dto.getEmail());
        client.setActivo(dto.getActivo());

        Client updated = repository.save(client);

        return convertToDTO(updated);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
    
    @Override
    public void deactivate(Long id) {

        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        if(client.getActivo()){
            client.setActivo(false);
        }else{
            client.setActivo(true);
        }
        repository.save(client);
    }

    private ClientDTO convertToDTO(Client client) {

        ClientDTO dto = new ClientDTO();
        dto.setIdCliente(client.getIdCliente());
        dto.setCedula(client.getCedula());
        dto.setNombre(client.getNombre());
        dto.setApellido(client.getApellido());
        dto.setDireccion(client.getDireccion());
        dto.setTelefono(client.getTelefono());
        dto.setEmail(client.getEmail());
        dto.setActivo(client.getActivo());

        return dto;
    }
}
