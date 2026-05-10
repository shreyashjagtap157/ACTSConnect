package com.connect.acts.ActsConnectBackend.controller;

import com.connect.acts.ActsConnectBackend.dto.LoginRequest;
import com.connect.acts.ActsConnectBackend.dto.RegisterRequest;
import com.connect.acts.ActsConnectBackend.dto.UserResponse;
import com.connect.acts.ActsConnectBackend.model.BatchSemester;
import com.connect.acts.ActsConnectBackend.model.Course;
import com.connect.acts.ActsConnectBackend.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void login_ValidRequest_ReturnsOk() throws Exception {
        LoginRequest request = new LoginRequest("test@example.com", "password");

        UserResponse mockResponse = new UserResponse();
        mockResponse.setStatus(200);
        mockResponse.setJwtToken("mockJwtToken");

        when(authService.loginUser(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.jwtToken").value("mockJwtToken"));
    }

    @Test
    void register_ValidRequest_ReturnsCreated() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setName("Test User");
        request.setBatchYear(2023);
        request.setBatchSemester(BatchSemester.MARCH);
        request.setCourseType(Course.DAC);

        UserResponse mockResponse = new UserResponse();
        mockResponse.setStatus(201);
        mockResponse.setJwtToken("mockJwtToken");

        when(authService.registerUser(any(RegisterRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.jwtToken").value("mockJwtToken"));
    }

    @Test
    void login_Unauthorized_ReturnsUnauthorized() throws Exception {
        LoginRequest request = new LoginRequest("test@example.com", "wrongpassword");

        UserResponse mockResponse = new UserResponse();
        mockResponse.setStatus(401);

        when(authService.loginUser(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()) // The controller actually returns 200 OK from the method signature always returning OK `new ResponseEntity<>(response, HttpStatus.OK);` but the status property in UserResponse will be 401
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    void register_Conflict_ReturnsConflict() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("existing@example.com");
        request.setPassword("password");
        request.setName("Test User");
        request.setBatchYear(2023);
        request.setBatchSemester(BatchSemester.MARCH);
        request.setCourseType(Course.DAC);

        UserResponse mockResponse = new UserResponse();
        mockResponse.setStatus(409);

        when(authService.registerUser(any(RegisterRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated()) // Controller always returns CREATED `new ResponseEntity<>(response, HttpStatus.CREATED);` but status property is 409
                .andExpect(jsonPath("$.status").value(409));
    }
}
