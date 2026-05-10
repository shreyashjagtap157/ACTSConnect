package com.connect.acts.ActsConnectBackend.controller;

import com.connect.acts.ActsConnectBackend.dto.LoginRequest;
import com.connect.acts.ActsConnectBackend.dto.RegisterRequest;
import com.connect.acts.ActsConnectBackend.dto.UserResponse;
import com.connect.acts.ActsConnectBackend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  //public constructor AuthController
  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  //

  //public method login
  @PostMapping("/login")
  public ResponseEntity<UserResponse> login(@RequestBody @Valid LoginRequest loginRequest, HttpServletResponse httpResponse) {
    UserResponse response = authService.loginUser(loginRequest);

    if (response.getStatus() == 200 && response.getJwtToken() != null) {
      Cookie cookie = new Cookie("jwt", response.getJwtToken());
      cookie.setHttpOnly(true);
      cookie.setPath("/");
      cookie.setMaxAge(24 * 60 * 60); // 1 day
      httpResponse.addCookie(cookie);
      response.setJwtToken(null);
    }

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //public method register
  @PostMapping("/register")
  public ResponseEntity<UserResponse> register(@RequestBody @Valid RegisterRequest registerRequest, HttpServletResponse httpResponse) {
    UserResponse response = authService.registerUser(registerRequest);

    if (response.getStatus() == 201 && response.getJwtToken() != null) {
      Cookie cookie = new Cookie("jwt", response.getJwtToken());
      cookie.setHttpOnly(true);
      cookie.setPath("/");
      cookie.setMaxAge(24 * 60 * 60); // 1 day
      httpResponse.addCookie(cookie);
      response.setJwtToken(null);
    }

    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  //public method logout
  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletResponse httpResponse) {
    Cookie cookie = new Cookie("jwt", null);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(0); // This deletes the cookie
    httpResponse.addCookie(cookie);

    return ResponseEntity.ok().build();
  }
}
