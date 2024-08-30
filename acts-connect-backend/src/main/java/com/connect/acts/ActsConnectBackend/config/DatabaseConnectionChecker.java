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
  public void checkConnection() throws SQLException {
    try (Connection connection = dataSource.getConnection()) {
      System.out.println("Database connection established successfully!");
    } catch (SQLException e) {
      System.err.println("Failed to establish database connection.");
      e.printStackTrace();
    }
  }
}