package org.sid.customerservice;

import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(CustomerRepository customerRepository,
											   RepositoryRestConfiguration restConfiguration){

		restConfiguration.exposeIdsFor(Customer.class);

		return args -> {
			customerRepository.saveAll(
					List.of(
							Customer.builder().name("owani").email("owani@gmail.com").build(),
							Customer.builder().name("sana").email("sana@gmail.com").build(),
							Customer.builder().name("willaumez").email("willaumez@gmail.com").build(),
							Customer.builder().name("williams").email("williams@gmail.com").build(),
							Customer.builder().name("jency").email("jency@gmail.com").build(),
							Customer.builder().name("willaum").email("willaum@gmail.com").build()
					)
			);

			customerRepository.findAll().forEach(System.out::println);
		};
	}

}
