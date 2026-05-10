package com.connect.acts.ActsConnectBackend.service;

import com.connect.acts.ActsConnectBackend.dto.RegisterRequest;
import com.connect.acts.ActsConnectBackend.dto.UserResponse;
import com.connect.acts.ActsConnectBackend.model.BatchSemester;
import com.connect.acts.ActsConnectBackend.model.Course;
import com.connect.acts.ActsConnectBackend.model.User;
import com.connect.acts.ActsConnectBackend.model.UserType;
import com.connect.acts.ActsConnectBackend.repo.AuthRepo;
import com.connect.acts.ActsConnectBackend.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthRepo authRepo;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(authRepo, bCryptPasswordEncoder, jwtUtil);
    }

    @Test
    void registerUser_Success() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setName("Test User");
        request.setBatchYear(2023);
        request.setBatchSemester(BatchSemester.MARCH);
        request.setCourseType(Course.DAC);

        User savedUser = new User();
        savedUser.setId(UUID.randomUUID());
        savedUser.setEmail(request.getEmail());
        savedUser.setUserType(UserType.STUDENT);

        when(authRepo.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtUtil.generateToken(any(), any(), any())).thenReturn("mockJwtToken");

        // Act
        UserResponse response = authService.registerUser(request);

        // Assert
        assertEquals(201, response.getStatus());
        assertEquals("mockJwtToken", response.getJwtToken());
        verify(authRepo, times(1)).save(any(User.class));
    }

    @Test
    void registerUser_SuccessWithOptionalFields() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test2@example.com");
        request.setPassword("password");
        request.setName("Test User 2");
        request.setBatchYear(2020);
        request.setBatchSemester(BatchSemester.SEPTEMBER);
        request.setCourseType(Course.DBDA);
        request.setPrn("123456789012");
        request.setCompany("Test Company");

        when(authRepo.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtUtil.generateToken(any(), any(), any())).thenReturn("mockJwtToken");

        // Act
        UserResponse response = authService.registerUser(request);

        // Assert
        assertEquals(201, response.getStatus());
        assertEquals("mockJwtToken", response.getJwtToken());
        verify(authRepo, times(1)).save(argThat(user ->
            "123456789012".equals(user.getPrn()) &&
            "Test Company".equals(user.getCompany())
        ));
    }

    @Test
    void registerUser_EmailAlreadyExists() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail("existing@example.com");
        request.setPassword("password");

        when(authRepo.findByEmail(request.getEmail())).thenReturn(Optional.of(new User()));

        // Act
        UserResponse response = authService.registerUser(request);

        // Assert
        assertEquals(409, response.getStatus());
        assertNull(response.getJwtToken());
        verify(authRepo, never()).save(any(User.class));
    }

    @Test
    void registerUser_NullRequest() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(null));
    }

    @Test
    void registerUser_MissingEmail() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setPassword("password");

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(request));
    }

    @Test
    void registerUser_MissingPassword() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(request));
    }
}
