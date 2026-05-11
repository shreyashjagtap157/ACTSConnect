package com.connect.acts.ActsConnectBackend.security;

import com.connect.acts.ActsConnectBackend.model.UserType;
import com.connect.acts.ActsConnectBackend.service.UserService;
import com.connect.acts.ActsConnectBackend.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final UserService userService;

  public JwtAuthenticationFilter(JwtUtil jwtUtil, UserService userService) {
    this.jwtUtil = jwtUtil;
    this.userService = userService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String email = null;
    String jwtToken = null;

    // First try to get token from cookies
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        if ("jwt".equals(cookie.getName())) {
          jwtToken = cookie.getValue();
          break;
        }
      }
    }

    // Fallback to Authorization header if not found in cookies
    if (jwtToken == null) {
      final String authHeader = request.getHeader("Authorization");
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
        jwtToken = authHeader.substring(7);
      }
    }

    if (jwtToken != null) {
      try {
        email = jwtUtil.extractEmail(jwtToken);
      } catch (Exception e) {
        // Log invalid token
        logger.error("Error extracting email from JWT token: " + e.getMessage());
      }
    }

    if (email != null && jwtUtil.validateToken(jwtToken, email) && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserType userType = userService.getUserTypeByEmail(email);
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
        email, null, new ArrayList<>());
      authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      SecurityContextHolder.getContext().setAuthentication(authToken);
      authToken.setDetails(userType);
    }

    filterChain.doFilter(request, response);
  }
}
