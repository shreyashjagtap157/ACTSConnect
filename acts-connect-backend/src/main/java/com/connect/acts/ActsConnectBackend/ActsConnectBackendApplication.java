package com.connect.acts.ActsConnectBackend;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ActsConnectBackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(ActsConnectBackendApplication.class);

	public static void main(String[] args) {
		Dotenv dotenv;
		try {
			dotenv = Dotenv.load();
		} catch (Exception e) {
			logger.error("Failed to load .env file: {}", e.getMessage(), e);
			System.exit(1);
			return;
		}

		try {
			// Set environment variables for prod
			setEnvVar("PROD_DB_URL", dotenv);
			setEnvVar("PROD_DB_UNAME", dotenv);
			setEnvVar("PROD_DB_PWD", dotenv);

			// Set JWT env variables
			setEnvVar("JWT_SECRET_KEY", dotenv);
			setEnvVar("JWT_EXPIRATION_TIME", dotenv, "JWT_EXPIRY");

			// Set environment variables for dev
			setEnvVar("DEV_DB_URL", dotenv);
			setEnvVar("DEV_DB_UNAME", dotenv);
			setEnvVar("DEV_DB_PWD", dotenv);

			// Set CORS origin
			setEnvVar("CORS_ORIGINS", dotenv);
		} catch (IllegalArgumentException e) {
			logger.error("Missing required environment variable: {}", e.getMessage(), e);
			System.exit(1);
			return;
		} catch (Exception e) {
			logger.error("Error loading environment variables: {}", e.getMessage(), e);
			System.exit(1);
			return;
		}

		SpringApplication.run(ActsConnectBackendApplication.class, args);
	}

	private static void setEnvVar(String key, Dotenv dotenv) {
		setEnvVar(key, dotenv, key);
	}

	private static void setEnvVar(String sysKey, Dotenv dotenv, String envKey) {
		String value = dotenv.get(envKey);
		if (value == null || value.isEmpty()) {
			throw new IllegalArgumentException(envKey);
		}
		System.setProperty(sysKey, value);
	}
}
