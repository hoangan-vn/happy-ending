package com.happyending.product.controllers

import com.happyending.product.dtos.CreateProductDTO
import com.happyending.product.entities.Product
import com.happyending.product.services.ProductService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

    @PostMapping
    fun createProduct(@Valid @RequestBody productCreationDto: CreateProductDTO): ResponseEntity<Product> {
        val product = productService.createProduct(productCreationDto)
        return ResponseEntity.created(URI.create("/api/products/${product.id}")).body(product)
    }

    @GetMapping("/{id}")
    fun getProduct(@PathVariable id: String): ResponseEntity<Product> {
        return productService.getProductById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }

    @GetMapping
    fun getAllProducts(): ResponseEntity<List<Product>> {
        return ResponseEntity.ok(productService.getAllProducts())
    }
}