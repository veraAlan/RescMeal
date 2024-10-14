package dev.group21.rescmeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.io.File;


@SpringBootApplication
@Configuration
@PropertySource("classpath:application-dev.properties")
public class RescmealApplication {

	public static void main(String[] args) {
		String assetsDir = System.getProperty("user.dir") + "/../Frontend/public/";
		File dir = new File(assetsDir + "Business/");
		if (!dir.exists()) {
			dir.mkdirs();
		}
		dir = new File(assetsDir + "Food/");
		if (!dir.exists()) {
			dir.mkdirs();
		}
		SpringApplication.run(RescmealApplication.class, args);
	}
}