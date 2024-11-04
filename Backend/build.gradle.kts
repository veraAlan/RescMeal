plugins {
	java
	id("org.springframework.boot") version "3.3.3"
	id("io.spring.dependency-management") version "1.1.6"
	id("org.hibernate.orm") version "6.5.2.Final"
	id("org.graalvm.buildtools.native") version "0.10.2"
}

group = "dev.group21"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

extra["springCloudVersion"] = "2023.0.3"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
	implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
	implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
	implementation("org.imgscalr:imgscalr-lib:4.2")

	implementation("org.springframework.boot:spring-boot-starter-web-services")
	implementation("javax.xml.ws:jaxws-api:2.3.1")
	implementation("jakarta.xml.ws:jakarta.xml.ws-api:2.3.3")
	implementation("org.apache.cxf:cxf-rt-frontend-jaxws:3.4.10")
	implementation("org.apache.cxf:cxf-rt-wsdl:3.4.10")

	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.webjars:chartjs:3.7.1")
	implementation("com.mercadopago:sdk-java:1.10.0") {
		exclude(group = "com.google.collections", module = "google-collections")
		exclude(group = "com.google.guava", module = "guava")
	}
	implementation("com.google.guava:guava:30.1-jre")

	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("com.mysql:mysql-connector-j")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("io.projectreactor:reactor-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}

hibernate {
	enhancement {
		enableAssociationManagement = true
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}