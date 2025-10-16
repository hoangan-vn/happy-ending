package com.happyending.product.dtos

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size
import java.math.BigDecimal

// DTO for sending product data to clients
data class CreateProductDTO(
    @field:NotEmpty
    @field:Size(max = 255)
    val name: String,

    @field:DecimalMin(value = "0.0", inclusive = false)
    val price: BigDecimal,

    val description: String?
)

