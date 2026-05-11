package com.actsconnect.exception;

public class ChatException extends Exception {

	public ChatException() {
		super();
	}

	public ChatException(String message) {
		super(message);
	}

	public ChatException(String message, Throwable cause) {
		super(message, cause);
	}
}
