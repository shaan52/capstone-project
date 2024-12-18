package com.expensetracker.service;

import com.expensetracker.entity.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExpenseServiceTest {

    @Autowired
    private ExpenseService expenseService;

    @MockBean
    private ExpenseRepository expenseRepository;

    @Test
    void testGetAllExpenses() {
        // Mock repository response
        List<Expense> mockExpenses = Arrays.asList(
                new Expense(1L, "Groceries", 50.0, "Food", "2024-12-01"),
                new Expense(2L, "Uber Ride", 20.0, "Transport", "2024-12-02")
        );
        Mockito.when(expenseRepository.findAll()).thenReturn(mockExpenses);

        List<Expense> expenses = expenseService.getAllExpenses();

        assertEquals(2, expenses.size());
        assertEquals("Groceries", expenses.get(0).getTitle());
    }

    @Test
    void testAddExpense() {
        Expense mockExpense = new Expense(null, "Gym Membership", 30.0, "Health", "2024-12-10");
        Mockito.when(expenseRepository.save(Mockito.any())).thenReturn(mockExpense);

        Expense createdExpense = expenseService.addExpense(mockExpense);

        assertNotNull(createdExpense);
        assertEquals("Gym Membership", createdExpense.getTitle());
    }
}
