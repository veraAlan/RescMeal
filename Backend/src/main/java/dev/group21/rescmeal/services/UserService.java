package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.model.User;
import dev.group21.rescmeal.model.*;
import dev.group21.rescmeal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found, username: " + username));

        return UserDetailsImpl.build(user);
    }

    // Se puede refactorizar para hacer una sola funcion.
    @Transactional
    public User updateCarrier(Long id, Carrier carrier) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found, id: " + id));
        user.setCarrier(carrier);
        return userRepository.save(user);
    }

    @Transactional
    public User updateClient(Long id, Client client) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found, id: " + id));
        user.setClient(client);
        return userRepository.save(user);
    }

    @Transactional
    public User updateBusiness(Long id, Business business) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found, id: " + id));
        user.setBusiness(business);
        return userRepository.save(user);
    }

    public User updateUser(Long userId, SignupRequest updateUser) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found."));
        user.setEmail(updateUser.getEmail());
        user.setUsername(updateUser.getUsername());
        return userRepository.save(user);
    }
}