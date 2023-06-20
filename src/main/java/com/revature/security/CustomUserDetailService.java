package com.revature.security;

import com.revature.daos.PersonDAO;
import com.revature.models.Person;
import com.revature.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private final PersonDAO personDao;

    public CustomUserDetailService(PersonDAO personDao) {
        this.personDao = personDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person p = personDao.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found"));
        return new User(p.getUsername(), p.getPassword(), mapRoleToAuthority(p.getRole()));
    }

    private Collection<GrantedAuthority> mapRoleToAuthority(Role role) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        return grantedAuthorities;
    }
}
