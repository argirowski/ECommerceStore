using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .ApplyOrdering(productParams.OrderBy)
                .ApplySearching(productParams.SearchTerm)
                .ApplyFiltering(productParams.Brands, productParams.Types)
                .AsQueryable();

            var pagedProducts = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(pagedProducts.MetaData);

            return pagedProducts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetBrandAndTypeFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();

            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDTO productDTO)
        {
            var product = mapper.Map<Product>(productDTO);

            if (productDTO.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDTO.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            context.Products.Add(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);
            }

            return BadRequest("Problem creating a new product");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct(UpdateProductDTO updateProductDTO)
        {
            var product = await context.Products.FindAsync(updateProductDTO.Id);

            if (product == null) return NotFound();

            mapper.Map(updateProductDTO, product);

            if (updateProductDTO.File != null)
            {
                var imageResult = await imageService.AddImageAsync(updateProductDTO.File);

                if (imageResult.Error != null)
                    return BadRequest(imageResult.Error.Message);

                if (!string.IsNullOrEmpty(product.PublicId))
                    await imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                return NoContent();
            }

            return BadRequest("Problem updating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(product.PublicId))
                await imageService.DeleteImageAsync(product.PublicId);

            context.Products.Remove(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest("Problem deleting the product");
        }
    }
}
