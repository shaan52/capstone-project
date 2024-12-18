package com.expensetracker.controller;

import com.expensetracker.payload.LoginRequest;
import com.expensetracker.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Test
    void testLoginSuccess() throws Exception {
        // Mock service response
        LoginRequest request = new LoginRequest("user", "password");
        Mockito.when(authService.login(request)).thenReturn("mock-jwt-token");

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\", \"password\":\"password\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void testLoginFailure() throws Exception {
        Mockito.when(authService.login(Mockito.any())).thenThrow(new RuntimeException("Invalid credentials"));

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"invalid\", \"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());
    }
}
