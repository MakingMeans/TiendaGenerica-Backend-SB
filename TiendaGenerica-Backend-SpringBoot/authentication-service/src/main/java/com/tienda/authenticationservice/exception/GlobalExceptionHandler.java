package com.tienda.authenticationservice.exception;

import com.tienda.authenticationservice.dto.ErrorResponseDTO;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

/**
 * GlobalExceptionHandler maneja de manera centralizada todas las excepciones
 * que pueden ocurrir en la aplicación y devuelve respuestas HTTP consistentes
 * con un cuerpo JSON definido por ErrorResponseDTO.
 *
 * HTTP status utilizados:
 * - 400 BAD REQUEST: Validaciones de DTOs (@NotBlank, @Email, etc.)
 * - 401 UNAUTHORIZED: Credenciales inválidas
 * - 403 FORBIDDEN: Usuario autenticado pero sin permisos suficientes
 * - 404 NOT FOUND: Recurso no encontrado
 * - 409 CONFLICT: Conflictos de datos o registros duplicados
 * - 500 INTERNAL SERVER ERROR: Errores inesperados del servidor
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 🔹 404 NOT FOUND
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> notFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseDTO(
                        404,
                        ex.getMessage(),
                        System.currentTimeMillis()
                ));
    }

    // 🔹 401 UNAUTHORIZED
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> invalidCredentials(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponseDTO(
                        401,
                        ex.getMessage(),
                        System.currentTimeMillis()
                ));
    }

    // 🔹 403 FORBIDDEN - Usuario autenticado pero sin permisos suficientes
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> accessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponseDTO(
                        403,
                        "No tienes permisos para acceder a este recurso",
                        System.currentTimeMillis()
                ));
    }

    // 🔹 409 CONFLICT - Recurso ya existe
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> alreadyExists(ResourceAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseDTO(
                        409,
                        ex.getMessage(),
                        System.currentTimeMillis()
                ));
    }

    // 🔹 400 BAD REQUEST - Validaciones de DTO (@NotBlank, @Email, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> validation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponseDTO(
                        400,
                        errors,
                        System.currentTimeMillis()
                ));
    }

    // 🔹 409 CONFLICT - Protección por si falla constraint UNIQUE en base de datos
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseDTO> databaseError(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseDTO(
                        409,
                        "Conflicto de datos. Posible valor duplicado.",
                        System.currentTimeMillis()
                ));
    }

    // 🔹 500 INTERNAL SERVER ERROR - Error inesperado
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> general(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseDTO(
                        500,
                        "Error interno del servidor",
                        System.currentTimeMillis()
                ));
    }
}