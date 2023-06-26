package com.revature.controllers;

import com.revature.daos.PersonDAO;
import com.revature.daos.RoleDAO;
import com.revature.dtos.AuthResponseDTO;
import com.revature.dtos.LoginDTO;
import com.revature.dtos.RegisterDTO;
import com.revature.models.Person;
import com.revature.models.Role;
import com.revature.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.List;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PersonDAO personDao;
    private final RoleDAO roleDao;
    private final PasswordEncoder passwordEncoder;

    private final JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PersonDAO personDao, RoleDAO roleDao, PasswordEncoder passwordEncoder, JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.personDao = personDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        if (personDao.existsByUsername(registerDTO.getUsername())) {
            return new ResponseEntity<String>("Username is taken", HttpStatus.BAD_REQUEST);
        }

        Person p = new Person();
        p.setFirstName(registerDTO.getFirstName());
        p.setLastName(registerDTO.getLastName());
        p.setUsername((registerDTO.getUsername()));
        p.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        Role role = roleDao.getByName("Employee");

        p.setRole(role);

        personDao.save(p);

        return new ResponseEntity<>("User successfully registered!", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

//        return new ResponseEntity<>("User successfully signed in", HttpStatus.OK);

        String token = jwtGenerator.generateToken(authentication);

        AuthResponseDTO response = new AuthResponseDTO(token);

        Person p = personDao.findByUsername(loginDTO.getUsername()).get();

        response.setUserId(p.getId());

        return new ResponseEntity<AuthResponseDTO>(response, HttpStatus.OK);
    }
}
