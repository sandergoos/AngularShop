using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual List<CompanyUser> CompanyUsers { get; set; }
    }
}
