package com.happyending.product.entities

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.math.BigDecimal

@Entity
@Schema(description = "Product entity representing a product in the system")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the product", example = "12345")
    var id: String? = null,

    @Schema(description = "Product name", example = "iPhone 15")
    var name: String,

    @Schema(description = "Product price", example = "999.99")
    var price: BigDecimal,

    @Schema(description = "Product description", example = "Latest iPhone with advanced features")
    var description: String? = null
) {
    // Per developer-guidelines.md, we should override equals and hashCode
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Product

        return id == other.id
    }

    override fun hashCode(): Int {
        return id?.hashCode() ?: 0
    }
}