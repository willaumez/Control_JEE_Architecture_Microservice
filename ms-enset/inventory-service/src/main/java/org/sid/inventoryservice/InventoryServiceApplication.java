package org.sid.inventoryservice;

import org.sid.inventoryservice.entities.Product;
import org.sid.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableDiscoveryClient
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ProductRepository productRepository,
                                               RepositoryRestConfiguration restConfiguration) {

        restConfiguration.exposeIdsFor(Product.class);

        return args -> {
            Random random = new Random();
            for (int i = 0; i < 15; i++) {
                productRepository.saveAll(List.of(
                        Product.builder()
                                .name("Computer: " + i)
                                .price(1200 + Math.random() * 1000)
                                .quantity(1 + random.nextInt(200))
                                .build()
                ));
            }
        };
    }

}
