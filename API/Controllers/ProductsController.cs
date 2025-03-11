using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context) : BaseApiController
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
    }
}
