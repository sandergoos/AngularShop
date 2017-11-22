using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class CompanyUser
    {
        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
