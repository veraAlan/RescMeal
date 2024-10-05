package dev.group21.rescmeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;


@SpringBootApplication
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