using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Shop.Extentions;

namespace Shop.Models
{
    public class Product
    {
        private DateTime? _createdAt;

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public DateTime? CreatedAt
        {
            get => _createdAt?.ToWesternEuropeStandardTime();
            set => _createdAt = value?.ToUniversalTime();
        }
    }
}
