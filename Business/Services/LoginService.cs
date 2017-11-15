using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Helpers;
using Shop.Models.RequestModels;

namespace Shop.Business.Services
{
    public class LoginService : ILoginService
    {
        private readonly ShopContext _context;

        public LoginService(ShopContext context)
        {
            _context = context;
        }

        public async Task<bool> IsAuthorizedAsync(LoginCredentials credentials)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == credentials.Email);

            if (user == null) return false;

            var challenge = Security.GenerateSaltedHash(credentials.Password, user.Salt);
            var storedHash = Security.StringToByteArray(user.HashedPassword);

            return Security.CompareByteArrays(challenge, storedHash);
        }

        public async Task<string> GetAuthenticationTokenAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            var secretKey = Startup.Secret;
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: "Shop",
                audience: "ShopManagement",
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
