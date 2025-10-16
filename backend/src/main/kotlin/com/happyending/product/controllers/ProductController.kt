package com.happyending.product.controllers

import com.happyending.product.dtos.CreateProductDTO
import com.happyending.product.entities.Product
import com.happyending.product.services.ProductService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product Management", description = "APIs for managing products")
class ProductController(private val productService: ProductService) {

    @PostMapping
    @Operation(
        summary = "Create a new product",
        description = "Creates a new product with the provided information"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "201",
                description = "Product created successfully",
                content = [Content(schema = Schema(implementation = Product::class))]
            ),
            ApiResponse(
                responseCode = "400",
                description = "Invalid input data"
            )
        ]
    )
    fun createProduct(
        @Parameter(description = "Product creation data")
        @Valid @RequestBody productCreationDto: CreateProductDTO
    ): ResponseEntity<Product> {
        val product = productService.createProduct(productCreationDto)
        return ResponseEntity.created(URI.create("/api/products/${product.id}")).body(product)
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get product by ID",
        description = "Retrieves a product by its unique identifier"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Product found",
                content = [Content(schema = Schema(implementation = Product::class))]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Product not found"
            )
        ]
    )
    fun getProduct(
        @Parameter(description = "Product ID", required = true)
        @PathVariable id: String
    ): ResponseEntity<Product> {
        return productService.getProductById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }

    @GetMapping
    @Operation(
        summary = "Get all products",
        description = "Retrieves a list of all available products"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "List of products retrieved successfully",
                content = [Content(schema = Schema(implementation = Array<Product>::class))]
            )
        ]
    )
    fun getAllProducts(): ResponseEntity<List<Product>> {
        return ResponseEntity.ok(productService.getAllProducts())
    }
}