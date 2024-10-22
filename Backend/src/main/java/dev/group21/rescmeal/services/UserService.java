package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.User;
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

    @Transactional
    public User updateBusiness(Long id, Business business) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found, id: " + id));
        user.setBusiness(business);
        return userRepository.save(user);
    }
}