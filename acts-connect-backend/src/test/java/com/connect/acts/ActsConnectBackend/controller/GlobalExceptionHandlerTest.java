package com.connect.acts.ActsConnectBackend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler exceptionHandler;

    @BeforeEach
    void setUp() {
        exceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void handleIllegalArgumentException_ShouldReturnGenericMessageAndObscureOriginalDetails() {
        // Arrange
        String sensitiveInternalDetails = "Sensitive user details: id=123, hash=abcdef";
        IllegalArgumentException ex = new IllegalArgumentException(sensitiveInternalDetails);

        // Act
        ApiResponse<String> response = exceptionHandler.handleIllegalArgumentException(ex);

        // Assert
        assertFalse(response.isSuccess(), "Response should indicate failure");
        assertEquals("Invalid argument provided", response.getMessage(), "Response message should be generic to prevent information leakage");
        assertNull(response.getData(), "Data should be null");
    }
}
