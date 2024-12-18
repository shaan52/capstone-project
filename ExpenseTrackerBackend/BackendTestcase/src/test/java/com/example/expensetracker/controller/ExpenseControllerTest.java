package com.expensetracker.controller;

import com.expensetracker.entity.Expense;
import com.expensetracker.service.ExpenseService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExpenseController.class)
class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExpenseService expenseService;

    @Test
    void testGetExpenses() throws Exception {
        Mockito.when(expenseService.getAllExpenses()).thenReturn(
                Arrays.asList(new Expense(1L, "Groceries", 50.0, "Food", "2024-12-01"))
        );

        mockMvc.perform(get("/api/expenses")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Groceries"));
    }

    @Test
    void testAddExpense() throws Exception {
        Expense newExpense = new Expense(null, "Gym", 30.0, "Health", "2024-12-10");
        Mockito.when(expenseService.addExpense(Mockito.any())).thenReturn(newExpense);

        mockMvc.perform(post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Gym\", \"amount\":30.0, \"category\":\"Health\", \"date\":\"2024-12-10\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Gym"));
    }
}
