using System.Threading.Tasks;
using Shop.Models.RequestModels;

namespace Shop.Business.Interfaces
{
    public interface ILoginService
    {
        Task<bool> IsAuthorizedAsync(LoginCredentials credentials);

        Task<string> GetAuthenticationTokenAsync(string email);
    }
}
