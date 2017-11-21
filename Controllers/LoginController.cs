using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Helpers;
using Shop.Models;
using Shop.Models.RequestModels;
using SQLitePCL;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ILoginService _service;

        public LoginController(ILoginService service, ShopContext context)
        {
            _service = service;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Authenticate([FromBody]LoginCredentials credentials)
        {
            var isAuthorized = await _service.IsAuthorizedAsync(credentials);
            if (!isAuthorized)
            {
                return Unauthorized();
            }

            return Ok(_service.GetAuthenticationTokenAsync(credentials.Email));
        }
    }
}