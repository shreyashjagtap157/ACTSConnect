package com.connect.acts.ActsConnectBackend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class DatabaseConnectionChecker {

  private final DataSource dataSource;

  public DatabaseConnectionChecker(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  @PostConstruct
  public void checkConnection() {
    try (Connection connection = dataSource.getConnection()) {
      if (connection.isValid(2)) {
        System.out.println("Database connection established successfully!");
      } else {
        throw new SQLException("Connection is not valid.");
      }
    } catch (SQLException e) {
      System.err.println("Failed to establish database connection: " + e.getMessage());
      throw new IllegalStateException("Database connection failed", e);
    }
  }
}